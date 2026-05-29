# pratham-arora

Personal portfolio site — final-year CS & AI student at Plaksha University building production ML systems and researching frontier VLM limitations.

**Live:** [pratham-arora.vercel.app](https://pratham-arora.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Space Grotesk, IBM Plex Sans, IBM Plex Mono
- **Hosting:** Vercel

## Structure

```
app/
  page.tsx               # Home — hero, experience, featured projects, research, skills
  work/
    page.tsx             # Project archive — server component, reads resume-data.json at build time
    work-client.tsx      # Client component: filter tabs + expand/collapse interactivity
  resume/page.tsx        # Resume — three downloadable PDFs (Master, SDE, AI/ML) with descriptors
  sitemap.ts             # Auto-generated sitemap.xml
  robots.ts              # Crawler rules
  not-found.tsx          # 404
components/
  site-nav.tsx           # Sticky header navigation
  metric-card.tsx        # Reusable metric display component
lib/
  utils.ts               # cn() utility
public/
  master-resume.pdf      # Full master resume PDF
  sde.pdf                # SDE-targeted resume PDF
  aiml.pdf               # AI/ML-targeted resume PDF
  master-resume.tex      # LaTeX source — edit this to update resume content
  sde.tex                # SDE variant LaTeX source
  aiml.tex               # AI/ML variant LaTeX source
scripts/
  sync_resume.py         # Parses master-resume.tex → updates resume-data.json
resume-data.json         # ← Single source of truth for ALL site content
.github/
  workflows/
    sync-resume.yml      # GitHub Action: auto-syncs JSON when .tex files are pushed
```

## Development

```bash
pnpm install
pnpm dev
```

## How content gets updated

This site has **no database**. All content is served from `resume-data.json`, which is statically bundled at build time. Two ways to update:

### Option A — Edit JSON directly

Edit `resume-data.json` → push → Vercel redeploys. Best for:
- Adding `githubUrl` / `liveUrl` to a project
- Adding a new project entry
- Changing `metrics`, `paperBadge`, `inProgress`, or other metadata fields
- Anything that doesn't exist in the LaTeX

### Option B — Edit the LaTeX (auto-syncs via GitHub Action)

Edit `public/master-resume.tex` → push → GitHub Action runs `scripts/sync_resume.py` → `resume-data.json` is automatically updated and committed → Vercel picks up the new commit and redeploys.

The sync script updates these fields from the LaTeX:
- `skills` (all four groups)
- `industryExperience` and `researchExperience` — title, company, dates, bullet achievements
- `projects[*].longDescription` — all resume bullets for matched projects
- `leadership` — title, org, dates, bullets

**The sync NEVER overwrites these JSON-only fields:**
`description` (hand-crafted narrative), `githubUrl`, `liveUrl`, `featured`, `metrics`, `paperBadge`, `inProgress`, `tags`, `id`, `date`, `status`

#### Adding links from the LaTeX

Place `% @github:` and `% @live:` comment markers directly after a `\resumeProjectHeading` line — the sync script picks them up and writes them to JSON:

```latex
\resumeProjectHeading
  {\textbf{My Project}}{Stack}{Date}
  % @github: https://github.com/prats3992/repo-name
  % @live: https://live-demo-url.com
  \resumeItemListStart
    ...
```

Leave the URL blank (`% @github:`) to skip updating that field.

You can use the same pattern for experience and leadership entries too. Put the marker comments directly after a `\resumeExperienceHeading` or `\resumeExperienceHeadingProgression` line and before `\resumeItemListStart`:

```latex
\resumeExperienceHeading
  {AI Engineering Intern}{Cotality}{Kolkata}{June 2025 -- July 2025}
  % @docs: https://docs.example.com/cotality-project-notes
  \resumeItemListStart
    ...
```

```latex
\resumeExperienceHeading
  {Head of Technology}{Athleda -- Plaksha Sports Society}{Plaksha University}{Apr. 2025 -- Feb. 2026}
  % @site: https://athleda.example.com
  \resumeItemListStart
    ...
```

The sync stores these as labeled links and the site renders them as compact link chips.

#### Running the sync manually

```bash
python3 scripts/sync_resume.py
# or with explicit paths:
python3 scripts/sync_resume.py --tex public/master-resume.tex --json resume-data.json
```

## Content schema

### What lives in `resume-data.json`

| Key | Used by |
|-----|---------|
| `personalInfo` | Hero section, nav, footer links |
| `industryExperience` | Experience section — supports `metrics` for stat badges |
| `researchExperience` | Research section |
| `projects` | `/work` archive + homepage featured cards |
| `skills` | Skills grid |
| `leadership` | Resume page only |

### Project fields

```jsonc
{
  "id": "unique-slug",
  "title": "Project Name",
  "description": "Hand-crafted narrative (problem → hook). Never overwritten by sync.",
  "longDescription": ["Resume bullet 1", "Resume bullet 2", "..."],  // synced from LaTeX
  "tags": ["Tech", "Stack"],
  "status": "Completed",       // or "In Progress"
  "date": "2025-08-01",        // used to derive the year label on cards
  "githubUrl": "https://...",  // leave "" to hide the link; set via % @github: in .tex
  "liveUrl": "https://...",    // leave "" to hide the link; set via % @live: in .tex
  "featured": true,            // true = appears on homepage Selected Projects section
  "category": "AI/ML",        // used for filter tabs on /work
  "metrics": { "key": "value" },  // optional metric badges shown on card
  "paperBadge": "Paper under review · MIT Presence journal",  // optional publication badge
  "inProgress": true           // optional amber "In Progress" badge
}
```

### Experience fields

```jsonc
{
  "title": "Role Title",
  "company": "Company Name",
  "location": "City",
  "startDate": "June 2025",   // split correctly from LaTeX "--" by the sync script
  "endDate": "July 2025",
  "achievements": ["Bullet 1", "Bullet 2"],  // synced from \resumeItem entries
  "metrics": { "key": "value" }  // optional — shown as stat badges above the bullets
}
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, experience, featured projects, research, skills |
| `/work` | Full project archive — category filters, inline expand/collapse |
| `/resume` | Role-targeted PDF downloads (Master, SDE, AI/ML) with descriptors |
| `/sitemap.xml` | Auto-generated sitemap for search engines |
| `/robots.txt` | Crawler rules |
