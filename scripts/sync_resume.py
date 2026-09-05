#!/usr/bin/env python3
"""
sync_resume.py - Parses public/CV.tex (or legacy LaTeX resume) and syncs text content into resume-data.json.

What it updates (from LaTeX):
  - personalInfo: name, email, location
  - education: institution, degree, cgpa, startDate, endDate
  - skills: languages, aiMl, webBackend, cloudTools
  - industryExperience: title, company, location, startDate, endDate, achievements
  - researchExperience: title, supervisor, organization, startDate, endDate, achievements
  - projects[*].longDescription (matched projects synced from LaTeX bullets)
  - leadership: title, organization, startDate, endDate, achievements

What it leaves untouched (JSON-only metadata):
  - projects: githubUrl, liveUrl, featured, category, metrics, paperBadge, inProgress, tags, id, date, status
  - personalInfo: github, linkedin, website

Usage:
  python scripts/sync_resume.py                          # uses defaults (public/CV.tex)
  python scripts/sync_resume.py --tex public/CV.tex --json resume-data.json
"""

import re
import json
import argparse
from pathlib import Path


# ── Helpers ──────────────────────────────────────────────────────────────────

def strip_latex(text: str) -> str:
    """Remove common LaTeX formatting commands, leaving plain text."""
    # Unescape LaTeX special characters first
    text = text.replace(r"\&", "&")
    text = text.replace(r"\%", "%")
    text = text.replace(r"\$", "$")
    text = text.replace(r"\#", "#")
    text = text.replace(r"\_", "_")
    text = text.replace(r"\{", "{")
    text = text.replace(r"\}", "}")
    # Remove \begin{...} and \end{...} environments
    text = re.sub(r"\\(begin|end)\{[^}]*\}", "", text)
    # Remove \textbf{...}, \textit{...}, \emph{...}, \small{...}, \footnotesize{...}, etc.
    for cmd in ("textbf", "textit", "emph", "small", "footnotesize", "large", "Huge", "needspace", "vspace", "hspace"):
        text = re.sub(rf"\\{cmd}\{{([^{{}}]*?)\}}", r"\1", text)
    # href{url}{label} -> label (second arg)
    text = re.sub(r"\\href\{[^}]*\}\{([^}]*)\}", r"\1", text)
    # Remove \textbf{\large ...} etc
    text = re.sub(r"\\[a-zA-Z]+\{([^{}]*)\}", r"\1", text)
    # Math mode: $N=18$ -> N=18 ; $p<0.05$ -> p<0.05
    text = re.sub(r"\$([^$]*)\$", r"\1", text)
    # Dashes -> standardize to hyphens (no em dashes)
    text = text.replace("---", " - ").replace("--", " - ")
    # LaTeX spacing
    text = text.replace(r"\ ", " ").replace(r"\,", " ").replace(r"\quad", " ")
    # Remove stray backslash-commands that take no args
    text = re.sub(r"\\[a-zA-Z]+\s*", "", text)
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_resume_items(block: str) -> list[str]:
    """Extract all \\resumeItem{...} contents from a block, handling nested braces."""
    items = []
    pattern = re.compile(r"\\resumeItem\{")
    for m in pattern.finditer(block):
        start = m.end()
        depth = 1
        i = start
        while i < len(block) and depth > 0:
            if block[i] == "{":
                depth += 1
            elif block[i] == "}":
                depth -= 1
            i += 1
        content = block[start : i - 1]
        items.append(strip_latex(content))
    return items


def extract_braced_args(text: str, start: int, n: int) -> tuple[list[str], int]:
    """Extract n consecutive {arg} groups from text starting at position start."""
    args = []
    pos = start
    for _ in range(n):
        # Skip whitespace and newlines
        while pos < len(text) and text[pos] in " \t\n\r":
            pos += 1
        if pos >= len(text) or text[pos] != "{":
            break
        depth = 1
        pos += 1  # skip opening {
        arg_start = pos
        while pos < len(text) and depth > 0:
            if text[pos] == "{":
                depth += 1
            elif text[pos] == "}":
                depth -= 1
            pos += 1
        args.append(text[arg_start : pos - 1])
    return args, pos


def split_on_commas(s: str) -> list[str]:
    """Split on commas that are NOT inside parentheses.
    e.g. 'Azure (Cosmos DB, OpenAI), Firebase' -> ['Azure (Cosmos DB, OpenAI)', 'Firebase']
    """
    parts: list[str] = []
    depth = 0
    current: list[str] = []
    for ch in s:
        if ch == "(":
            depth += 1
            current.append(ch)
        elif ch == ")":
            depth -= 1
            current.append(ch)
        elif ch == "," and depth == 0:
            parts.append("".join(current).strip())
            current = []
        else:
            current.append(ch)
    if current:
        parts.append("".join(current).strip())
    return [p for p in parts if p]


def norm_key(text: str) -> str:
    return re.sub(r"\s+", " ", strip_latex(text)).strip().lower()


def get_section_block(tex: str, section_name: str) -> str:
    """Extract the contents of a section named section_name (supports \\section and \\section*)."""
    p = rf"\\section\*?\{{{re.escape(section_name)}\}}"
    m = re.search(p, tex)
    if not m:
        first_word = re.escape(section_name.split()[0])
        p2 = rf"\\section\*?\{{[^}}]*{first_word}[^}}]*\}}"
        m = re.search(p2, tex)
        if not m:
            return ""
    start = m.end()
    m2 = re.search(r"\\section\*?\{|\\end\{document\}", tex[start:])
    end = start + m2.start() if m2 else len(tex)
    return tex[start:end]


def extract_cventries(sec_text: str) -> list[dict]:
    """
    Extract \\cventry{Title}{Date}{Organization/Subtitle}{Location} entries from CV.tex.
    Filters out commented out lines.
    """
    entries = []
    for m in re.finditer(r"\\cventry(?=\s*\{)", sec_text):
        line_start = sec_text.rfind("\n", 0, m.start()) + 1
        if sec_text[line_start:m.start()].strip().startswith("%"):
            continue

        args, after_args = extract_braced_args(sec_text, m.end(), 4)
        if len(args) != 4:
            continue

        title = strip_latex(args[0])
        raw_date = args[1]
        date_parts = re.split(r"\s*(?:---|--|–|—|-)\s*", raw_date, maxsplit=1)
        start_date = strip_latex(date_parts[0]).strip() if date_parts else ""
        end_date = strip_latex(date_parts[1]).strip() if len(date_parts) > 1 else ""

        subtitle = strip_latex(args[2])
        location = strip_latex(args[3])

        rest = sec_text[after_args:]
        item_m = re.search(r"\\begin\{itemize\}(.*?)\\end\{itemize\}", rest, re.DOTALL)
        achievements = []
        if item_m:
            cleaned = re.sub(r"(?m)^\s*%.*$", "", item_m.group(1))
            cleaned = re.sub(r"\\(begin|end)\{itemize\}", "", cleaned)
            for it in re.findall(r"\\item\s+(.*?)(?=\\item|\Z)", cleaned, re.DOTALL):
                clean_it = strip_latex(it)
                if clean_it:
                    if clean_it[0].islower():
                        clean_it = clean_it[0].upper() + clean_it[1:]
                    achievements.append(clean_it)

        entries.append({
            "title": title,
            "startDate": start_date,
            "endDate": end_date,
            "subtitle": subtitle,
            "location": location,
            "achievements": achievements,
        })
    return entries


# ── Section extractors ────────────────────────────────────────────────────────

def extract_education(tex: str) -> list[dict]:
    """Parse education from \\section*{Education} in CV.tex or \\resumeSubheading."""
    sec = get_section_block(tex, "Education")
    if not sec:
        return []

    hl_m = re.search(r"\\cvheaderline\{([^}]+)\}\{([^}]+)\}", sec)
    if hl_m:
        institution = strip_latex(hl_m.group(1))
        end_date = strip_latex(hl_m.group(2))
        deg_m = re.search(r"\\textit\{([^}]+)\}", sec)
        degree = strip_latex(deg_m.group(1)) if deg_m else "B.Tech. in Computer Science & AI"
        loc_m = re.search(r"\\hfill\s*\\textit\{([^}]+)\}", sec)
        location = strip_latex(loc_m.group(1)) if loc_m else "Mohali, India"
        cgpa_m = re.search(r"CGPA:\s*([0-9.]+)", sec)
        cgpa = cgpa_m.group(1) if cgpa_m else "8.35"
        return [{
            "institution": institution,
            "location": location,
            "degree": degree,
            "cgpa": cgpa,
            "startDate": "Aug. 2022",
            "endDate": end_date,
        }]

    return []


def extract_skills(tex: str) -> dict:
    """Parse Skills block from CV.tex or legacy template."""
    sec = get_section_block(tex, "Technical Skills")
    if not sec:
        sec = get_section_block(tex, "Skills")
    if not sec:
        return {}

    skills_dict = {}
    for line in sec.splitlines():
        trimmed = line.strip()
        if trimmed.startswith("%"):
            continue
        sm = re.search(r"\\item\s*\\textbf\{([^:]+):\}\s*(.*)", trimmed)
        if sm:
            cat = strip_latex(sm.group(1)).lower()
            raw_list = sm.group(2).rstrip("\\").strip()
            items = split_on_commas(strip_latex(raw_list))
            if "language" in cat:
                skills_dict["languages"] = items
            elif "ml" in cat or "vision" in cat or "ai" in cat:
                skills_dict["aiMl"] = items
            elif "system" in cat or "cloud" in cat or "web" in cat:
                web = []
                cloud = []
                for item in items:
                    if any(kw in item.lower() for kw in ["fastapi", "node", "next", "rest", "pydantic", "css", "react"]):
                        web.append(item)
                    else:
                        cloud.append(item)
                if web:
                    skills_dict["webBackend"] = web
                if cloud:
                    skills_dict["cloudTools"] = cloud

    if not skills_dict:
        def get_skill_list(label: str) -> list[str]:
            pattern = rf"\\textbf\{{{label}:?\}}\s*\\enspace\s*([^\\\n]+)"
            sm = re.search(pattern, sec)
            if not sm:
                return []
            raw = sm.group(1).rstrip("\\").strip()
            return split_on_commas(raw)

        return {
            "languages": get_skill_list("Languages"),
            "aiMl": get_skill_list("AI/ML"),
            "webBackend": get_skill_list(r"Web \\& Backend"),
            "cloudTools": get_skill_list(r"Cloud \\& Tools"),
        }

    return skills_dict


def extract_experience_blocks(tex: str, section_name: str) -> list[dict]:
    """
    Extract experience entries from CV.tex (using \\cventry) or legacy template.
    """
    sec_block = get_section_block(tex, section_name)
    if not sec_block:
        return []

    if "\\cventry" in sec_block:
        cv_entries = extract_cventries(sec_block)
        results = []
        for b in cv_entries:
            results.append({
                "title": b["title"],
                "subtitle": b["subtitle"],
                "org": b["subtitle"],
                "company": b["subtitle"],
                "location": b["location"],
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"],
            })
        return results

    # Legacy \resumeExperienceHeading format
    heading_re = re.compile(r"\\resumeExperienceHeading(?:Progression)?(?=\s*\{)")
    results = []
    for hm in heading_re.finditer(sec_block):
        is_progression = "Progression" in sec_block[hm.start() : hm.end()]
        n_args = 5 if is_progression else 4
        args, after_args = extract_braced_args(sec_block, hm.end(), n_args)

        if is_progression and len(args) == 5:
            title = strip_latex(args[0])
            subtitle = f"{strip_latex(args[1])} -> {strip_latex(args[2])}"
            org = strip_latex(args[3])
        elif len(args) == 4:
            title = strip_latex(args[0])
            subtitle = strip_latex(args[1])
            org = strip_latex(args[2])
        else:
            continue

        raw_date = args[3] if not is_progression else args[4]
        date_parts = re.split(r"\s*(?:---|--|–|—|-)\s*", raw_date, maxsplit=1)
        start_date = strip_latex(date_parts[0]).strip() if date_parts else ""
        end_date = strip_latex(date_parts[1]).strip() if len(date_parts) > 1 else ""

        rest = sec_block[after_args:]
        item_block_m = re.search(r"\\resumeItemListStart(.*?)\\resumeItemListEnd", rest, re.DOTALL)
        achievements = extract_resume_items(item_block_m.group(1)) if item_block_m else []

        results.append({
            "title": title,
            "subtitle": subtitle,
            "org": org,
            "company": org,
            "startDate": start_date,
            "endDate": end_date,
            "achievements": achievements,
        })
    return results


def extract_projects(tex: str) -> list[dict]:
    """Extract projects from Technical Projects section."""
    sec = get_section_block(tex, "Technical Projects")
    if not sec:
        return []

    if "\\cventry" in sec:
        cv_entries = extract_cventries(sec)
        results = []
        for b in cv_entries:
            results.append({
                "title": b["title"],
                "bullets": b["achievements"],
                "githubUrl": "",
                "liveUrl": "",
            })
        return results

    ph_re = re.compile(r"\\resumeProjectHeading(?=\s*\{)")
    results = []
    for pm in ph_re.finditer(sec):
        args, after_args = extract_braced_args(sec, pm.end(), 3)
        if len(args) < 1:
            continue
        title = strip_latex(args[0])

        rest = sec[after_args:]
        item_block_m = re.search(r"\\resumeItemListStart(.*?)\\resumeItemListEnd", rest, re.DOTALL)
        bullets = extract_resume_items(item_block_m.group(1)) if item_block_m else []

        results.append({"title": title, "bullets": bullets, "githubUrl": "", "liveUrl": ""})
    return results


def extract_leadership(tex: str) -> list[dict]:
    """Extract leadership from Leadership & Involvement section."""
    sec = get_section_block(tex, "Leadership & Involvement")
    if not sec:
        sec = get_section_block(tex, "Leadership")
    if not sec:
        return []

    cleaned = re.sub(r"(?m)^\s*%.*$", "", sec)
    cleaned = re.sub(r"\\(begin|end)\{itemize\}", "", cleaned)
    items = re.findall(r"\\item\s+(.*?)(?=\\item|\Z)", cleaned, re.DOTALL)
    if items and "\\resumeExperienceHeading" not in sec:
        results = []
        for raw in items:
            text = strip_latex(raw)
            if not text:
                continue
            # Pattern: Role, Org (Dates): Achievement
            m = re.match(r"^(.*?),\s*(.*?)\s*\(([^)]+)\):\s*(.*)$", text)
            if m:
                title = m.group(1).strip()
                org = m.group(2).strip()
                raw_date = m.group(3).strip()
                date_parts = re.split(r"\s*(?:---|--|–|—|-)\s*", raw_date, maxsplit=1)
                start_date = date_parts[0].strip() if date_parts else ""
                end_date = date_parts[1].strip() if len(date_parts) > 1 else ""
                ach = m.group(4).strip()
                if ach and ach[0].islower():
                    ach = ach[0].upper() + ach[1:]
                results.append({
                    "title": title,
                    "organization": org,
                    "startDate": start_date,
                    "endDate": end_date,
                    "achievements": [ach],
                })
            else:
                ach = text
                if ach and ach[0].islower():
                    ach = ach[0].upper() + ach[1:]
                results.append({
                    "title": text[:30],
                    "organization": "",
                    "startDate": "",
                    "endDate": "",
                    "achievements": [ach],
                })
        return results

    return extract_experience_blocks(tex, "Leadership & Involvement")


# ── Main sync ────────────────────────────────────────────────────────────────

def sync(tex_path: Path, json_path: Path) -> None:
    tex = tex_path.read_text(encoding="utf-8")
    data = json.loads(json_path.read_text(encoding="utf-8"))

    # ── Education ──
    edu = extract_education(tex)
    if edu and "education" in data:
        data["education"] = edu
        print(f"  Education: synced {len(edu)} entries")

    # ── Skills ──
    skills = extract_skills(tex)
    if skills:
        for key, val in skills.items():
            if val and key in data.get("skills", {}):
                data["skills"][key] = val
        print(f"  Skills: updated {list(skills.keys())}")

    # ── Research Experience ──
    research_blocks = extract_experience_blocks(tex, "Research Experience")
    if research_blocks:
        new_research = []
        for b in research_blocks:
            matched = None
            b_title_norm = norm_key(b["title"])
            b_sub_norm = norm_key(b.get("subtitle", ""))
            for ex in data.get("researchExperience", []):
                ex_title_norm = norm_key(ex.get("title", ""))
                ex_sup_norm = norm_key(ex.get("supervisor", ""))
                if (b_sub_norm and b_sub_norm in ex_sup_norm) or (b_title_norm and b_title_norm in ex_title_norm):
                    matched = ex
                    break
            existing = matched or {}
            new_research.append({
                **existing,
                "title": b["title"],
                "supervisor": b.get("subtitle", existing.get("supervisor", "")),
                "organization": existing.get("organization", "Plaksha University"),
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"] if b["achievements"] else existing.get("achievements", []),
            })
        data["researchExperience"] = new_research
        print(f"  Research: synced {len(new_research)} entries")

    # ── Industry Experience ──
    industry_blocks = extract_experience_blocks(tex, "Industry Experience")
    if industry_blocks:
        new_industry = []
        for b in industry_blocks:
            matched = None
            b_comp_norm = norm_key(b.get("company", ""))
            b_title_norm = norm_key(b.get("title", ""))
            for ex in data.get("industryExperience", []):
                ex_comp_norm = norm_key(ex.get("company", ""))
                ex_title_norm = norm_key(ex.get("title", ""))
                # Match by company overlap
                if b_comp_norm and ex_comp_norm and (b_comp_norm in ex_comp_norm or ex_comp_norm in b_comp_norm):
                    matched = ex
                    break
                if b_title_norm and ex_title_norm and b_title_norm == ex_title_norm:
                    matched = ex
                    break
            existing = matched or {}
            new_industry.append({
                **existing,
                "title": b["title"],
                "company": b.get("company", existing.get("company", "")),
                "location": b.get("location", existing.get("location", "")),
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"] if b["achievements"] else existing.get("achievements", []),
            })
        data["industryExperience"] = new_industry
        print(f"  Industry: synced {len(new_industry)} entries")

    # ── Projects ──
    tex_projects = extract_projects(tex)
    for tex_proj in tex_projects:
        def norm(s: str) -> str:
            return re.sub(r"[\u2013\u2014\-]+", " ", s).lower()

        def words(s: str) -> list[str]:
            return norm(s).split()

        tex_norm = norm(tex_proj["title"])
        tex_words = words(tex_proj["title"])
        matched = None
        for p in data["projects"]:
            p_norm = norm(p["title"])
            p_words = words(p["title"])
            if p_norm == tex_norm:
                matched = p
                break
            if tex_words[:2] and tex_words[:2] == p_words[:2]:
                matched = p
                break
        if matched and tex_proj["bullets"]:
            matched["longDescription"] = tex_proj["bullets"]
            print(f"  Project synced: {matched['title']}")
        elif not matched:
            print(f"  Project NOT matched in JSON: {tex_proj['title']!r}")

    # ── Leadership ──
    leader_blocks = extract_leadership(tex)
    if leader_blocks:
        new_leadership = []
        for b in leader_blocks:
            matched = None
            b_org_norm = norm_key(b.get("organization", ""))
            b_title_norm = norm_key(b.get("title", ""))
            for ex in data.get("leadership", []):
                ex_title_norm = norm_key(ex.get("title", ""))
                ex_sub_norm = norm_key(ex.get("subtitle", ""))
                ex_org_norm = norm_key(ex.get("organization", ""))
                if b_org_norm and (b_org_norm in ex_title_norm or b_org_norm in ex_org_norm):
                    matched = ex
                    break
                if b_title_norm and (b_title_norm in ex_title_norm or b_title_norm in ex_sub_norm):
                    matched = ex
                    break
            existing = matched or {}
            entry = {
                **existing,
                "title": existing.get("title", b["title"]),
                "organization": b.get("organization", existing.get("organization", "")),
                "startDate": b.get("startDate", existing.get("startDate", "")),
                "endDate": b.get("endDate", existing.get("endDate", "")),
                "achievements": b.get("achievements", existing.get("achievements", [])),
            }
            if "subtitle" in existing and not b.get("subtitle"):
                entry["subtitle"] = existing["subtitle"]
            elif b.get("subtitle"):
                entry["subtitle"] = b["subtitle"]
            new_leadership.append(entry)
        data["leadership"] = new_leadership
        print(f"  Leadership: synced {len(new_leadership)} entries")

    # ── Write back ──
    json_path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"\n✓ Wrote {json_path}")


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync CV.tex -> resume-data.json")
    parser.add_argument(
        "--tex",
        default="public/CV.tex",
        help="Path to the LaTeX source file (default: public/CV.tex)",
    )
    parser.add_argument(
        "--json",
        default="resume-data.json",
        help="Path to resume-data.json (default: resume-data.json)",
    )
    args = parser.parse_args()

    tex_path = Path(args.tex)
    json_path = Path(args.json)

    if not tex_path.exists():
        raise SystemExit(f"ERROR: LaTeX file not found: {tex_path}")
    if not json_path.exists():
        raise SystemExit(f"ERROR: JSON file not found: {json_path}")

    print(f"Syncing {tex_path} -> {json_path}")
    sync(tex_path, json_path)
