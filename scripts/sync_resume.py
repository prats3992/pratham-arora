#!/usr/bin/env python3
"""
sync_resume.py — Parses master-resume.tex and syncs text content into resume-data.json.

What it updates (from LaTeX):
  - personalInfo: name, email, location
  - education: institution, degree, cgpa, startDate, endDate
  - skills: languages, aiMl, webBackend, cloudTools
  - industryExperience: title, company, location, startDate, endDate, achievements
  - researchExperience: title, supervisor, organization, startDate, endDate, achievements
  - projects[*].longDescription  (first element = description, rest = extra bullets)
  - leadership: title, organization, startDate, endDate, achievements

What it leaves untouched (JSON-only metadata):
  - projects: githubUrl, liveUrl, featured, category, metrics, paperBadge, inProgress, tags, id, date, status
  - personalInfo: github, linkedin, website

Usage:
  python scripts/sync_resume.py                          # uses defaults
  python scripts/sync_resume.py --tex public/master-resume.tex --json resume-data.json
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
    # Remove \textbf{...}, \textit{...}, \emph{...}, \small{...}, \footnotesize{...}
    for cmd in ("textbf", "textit", "emph", "small", "footnotesize", "large", "href"):
        text = re.sub(rf"\\{cmd}\{{([^{{}}]*?)\}}", r"\1", text)
    # href{url}{label} → label (second arg)
    text = re.sub(r"\\href\{[^}]*\}\{([^}]*)\}", r"\1", text)
    # Remove \textbf{\large ...} etc
    text = re.sub(r"\\[a-zA-Z]+\{([^{}]*)\}", r"\1", text)
    # Math mode: $N=18$ → N=18 ; $p<0.05$ → p<0.05
    text = re.sub(r"\$([^$]*)\$", r"\1", text)
    # Dashes
    text = text.replace("--", "–").replace("---", "—")
    # LaTeX spacing
    text = text.replace(r"\ ", " ").replace(r"\,", " ")
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
    e.g. 'Azure (Cosmos DB, OpenAI), Firebase' → ['Azure (Cosmos DB, OpenAI)', 'Firebase']
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


# ── Section extractors ────────────────────────────────────────────────────────

def extract_skills(tex: str) -> dict:
    """Parse the Skills itemize block."""
    sec_start = tex.find("\\section{Skills}")
    if sec_start == -1:
        return {}
    next_sec = tex.find("\\section{", sec_start + 1)
    end_doc = tex.find("\\end{document}", sec_start)
    candidates = [x for x in [next_sec, end_doc] if x != -1]
    sec_end = min(candidates) if candidates else len(tex)
    block = tex[sec_start:sec_end]

    def get_skill_list(label: str) -> list[str]:
        pattern = rf"\\textbf\{{{label}:?\}}\s*\\enspace\s*([^\\\n]+)"
        sm = re.search(pattern, block)
        if not sm:
            return []
        raw = sm.group(1).rstrip("\\").strip()
        return split_on_commas(raw)

    return {
        "languages":  get_skill_list("Languages"),
        "aiMl":       get_skill_list("AI/ML"),
        "webBackend": get_skill_list(r"Web \\& Backend"),
        "cloudTools": get_skill_list(r"Cloud \\& Tools"),
    }


def extract_experience_blocks(tex: str, section_name: str) -> list[dict]:
    """
    Extract \\resumeExperienceHeading / \\resumeExperienceHeadingProgression blocks
    from a named section.
    """
    # section_name is the literal string as it appears between \section{...} in the tex
    # We search for it literally (not regex-escaped) so \& etc work naturally
    sec_start = tex.find(f"\\section{{{section_name}}}")
    if sec_start == -1:
        return []
    # Find next \section{ or \end{document}
    next_sec = tex.find("\\section{", sec_start + 1)
    end_doc = tex.find("\\end{document}", sec_start)
    sec_end = min(x for x in [next_sec, end_doc] if x != -1)
    block = tex[sec_start:sec_end]

    results = []

    # Match both heading variants (regex stops before the first {)
    heading_re = re.compile(
        r"\\resumeExperienceHeading(?:Progression)?(?=\s*\{)"
    )

    for hm in heading_re.finditer(block):
        # hm.end() points to whitespace or { — let extract_braced_args find them
        is_progression = "Progression" in block[hm.start() : hm.end()]
        n_args = 5 if is_progression else 4
        args, after_args = extract_braced_args(block, hm.end(), n_args)

        if is_progression and len(args) == 5:
            # {title}{role_from}{role_to}{org}{date}
            title = strip_latex(args[0])
            subtitle = f"{strip_latex(args[1])} → {strip_latex(args[2])}"
            org = strip_latex(args[3])
        elif len(args) == 4:
            # {title}{subtitle}{org}{date}
            title = strip_latex(args[0])
            subtitle = strip_latex(args[1])
            org = strip_latex(args[2])
        else:
            continue

        # Split date on "--", "–", or "—" BEFORE strip_latex converts "--" to "–"
        raw_date = args[3] if not is_progression else args[4]
        date_parts = re.split(r"\s*(?:--|–|—)\s*", raw_date, maxsplit=1)
        start_date = strip_latex(date_parts[0]).strip() if date_parts else ""
        end_date = strip_latex(date_parts[1]).strip() if len(date_parts) > 1 else ""

        # Items: grab the resumeItemListStart...End block after the heading args
        rest = block[after_args:]
        item_block_m = re.search(
            r"\\resumeItemListStart(.*?)\\resumeItemListEnd", rest, re.DOTALL
        )
        achievements = extract_resume_items(item_block_m.group(1)) if item_block_m else []

        results.append({
            "title": title,
            "subtitle": subtitle,
            "org": org,
            "startDate": start_date,
            "endDate": end_date,
            "achievements": achievements,
        })

    return results


def extract_projects(tex: str) -> list[dict]:
    """Extract \\resumeProjectHeading blocks from Technical Projects section."""
    sec_start = tex.find("\\section{Technical Projects}")
    if sec_start == -1:
        return []
    next_sec = tex.find("\\section{", sec_start + 1)
    end_doc = tex.find("\\end{document}", sec_start)
    sec_end = min(x for x in [next_sec, end_doc] if x != -1)
    block = tex[sec_start:sec_end]

    results = []
    ph_re = re.compile(r"\\resumeProjectHeading(?=\s*\{)")

    for pm in ph_re.finditer(block):
        args, after_args = extract_braced_args(block, pm.end(), 3)
        if len(args) < 1:
            continue
        title = strip_latex(args[0])

        rest = block[after_args:]
        item_block_m = re.search(
            r"\\resumeItemListStart(.*?)\\resumeItemListEnd", rest, re.DOTALL
        )
        bullets = extract_resume_items(item_block_m.group(1)) if item_block_m else []

        # Pick up % @github: and % @live: markers between the heading args and \resumeItemListStart
        # The markers must appear BEFORE the \resumeItemListStart of THIS project
        next_item_list = block.find("\\resumeItemListStart", after_args)
        comment_zone = block[after_args:next_item_list] if next_item_list != -1 else ""
        github_url = ""
        live_url = ""
        for line in comment_zone.splitlines():
            stripped = line.strip()
            gm = re.match(r"%\s*@github:\s*(\S+)", stripped)
            if gm:
                github_url = gm.group(1)
            lm = re.match(r"%\s*@live:\s*(\S+)", stripped)
            if lm:
                live_url = lm.group(1)

        results.append({"title": title, "bullets": bullets, "githubUrl": github_url, "liveUrl": live_url})

    return results


def extract_leadership(tex: str) -> list[dict]:
    return extract_experience_blocks(tex, r"Leadership \& Involvement")


# ── Main sync ────────────────────────────────────────────────────────────────

def sync(tex_path: Path, json_path: Path) -> None:
    tex = tex_path.read_text(encoding="utf-8")
    data = json.loads(json_path.read_text(encoding="utf-8"))

    # ── Skills ──
    skills = extract_skills(tex)
    if skills:
        for key, val in skills.items():
            if val:
                data["skills"][key] = val
        print(f"  Skills: updated {list(skills.keys())}")

    # ── Research Experience ──
    research_blocks = extract_experience_blocks(tex, "Research Experience")
    if research_blocks:
        new_research = []
        for i, b in enumerate(research_blocks):
            existing = data["researchExperience"][i] if i < len(data["researchExperience"]) else {}
            new_research.append({
                **existing,
                "title": b["title"],
                "supervisor": b["subtitle"],   # subtitle = "sup. by ..."
                "organization": b["org"],
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"],
            })
        data["researchExperience"] = new_research
        print(f"  Research: synced {len(new_research)} entries")

    # ── Industry Experience ──
    industry_blocks = extract_experience_blocks(tex, "Industry Experience")
    if industry_blocks:
        new_industry = []
        for i, b in enumerate(industry_blocks):
            existing = data["industryExperience"][i] if i < len(data["industryExperience"]) else {}
            # subtitle = "Company | Location"
            sub_parts = re.split(r"\s*\|\s*|\s*\$\|\$\s*", b["subtitle"], maxsplit=1)
            company = sub_parts[0].strip() if sub_parts else b["subtitle"]
            location = sub_parts[1].strip() if len(sub_parts) > 1 else existing.get("location", "")
            new_industry.append({
                **existing,
                "title": b["title"],
                "company": company,
                "location": location,
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"],
            })
        data["industryExperience"] = new_industry
        print(f"  Industry: synced {len(new_industry)} entries")

    # ── Projects ──
    tex_projects = extract_projects(tex)
    for tex_proj in tex_projects:
        # Normalize dashes/case for matching
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
            # Exact normalized match
            if p_norm == tex_norm:
                matched = p
                break
            # First 3 words match (handles subtitle differences like "– Website" vs "— CA Firm Website")
            if tex_words[:3] and tex_words[:3] == p_words[:3]:
                matched = p
                break
        if matched and tex_proj["bullets"]:
            # Sync longDescription (all LaTeX bullets) but NEVER overwrite description
            # (description is the hand-crafted portfolio narrative, not a resume bullet)
            matched["longDescription"] = tex_proj["bullets"]
            # Update links from @github / @live markers if provided
            if tex_proj.get("githubUrl"):
                matched["githubUrl"] = tex_proj["githubUrl"]
                print(f"    → githubUrl: {tex_proj['githubUrl']}")
            if tex_proj.get("liveUrl"):
                matched["liveUrl"] = tex_proj["liveUrl"]
                print(f"    → liveUrl:   {tex_proj['liveUrl']}")
            print(f"  Project synced: {matched['title']}")
        elif not matched:
            print(f"  Project NOT matched (no JSON entry): {tex_proj['title']!r}")

    # ── Leadership ──
    leader_blocks = extract_leadership(tex)
    if leader_blocks:
        new_leadership = []
        for i, b in enumerate(leader_blocks):
            existing = data["leadership"][i] if i < len(data["leadership"]) else {}
            new_leadership.append({
                **existing,
                "title": b["title"],
                "organization": b["org"],
                "startDate": b["startDate"],
                "endDate": b["endDate"],
                "achievements": b["achievements"],
            })
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
    parser = argparse.ArgumentParser(description="Sync master-resume.tex → resume-data.json")
    parser.add_argument(
        "--tex",
        default="public/master-resume.tex",
        help="Path to the LaTeX source file (default: public/master-resume.tex)",
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

    print(f"Syncing {tex_path} → {json_path}")
    sync(tex_path, json_path)
