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
    page.tsx             # Project archive — statically rendered from resume-data.json
    work-client.tsx      # Client component handling filter tabs + expand/collapse
  resume/page.tsx        # Resume — three downloadable PDFs with descriptors
  sitemap.ts             # Auto-generated sitemap.xml
  robots.ts              # Crawler rules
  not-found.tsx          # 404
components/
  site-nav.tsx           # Sticky header navigation
  metric-card.tsx        # Reusable metric display component
lib/
  firebase.ts            # Firebase singleton (used by external projects, not the portfolio)
  utils.ts               # cn() utility
resume-data.json         # ← Single source of truth for ALL site content
```

## Development

```bash
pnpm install
pnpm dev
```

## Updating Content

**Everything on this site flows from a single file: `resume-data.json`.**

Edit that file, push to GitHub, and Vercel redeploys automatically. No database syncing, no environment variables to manage for content updates.

### What lives in `resume-data.json`

| Key | Used by |
|-----|---------|
| `personalInfo` | Hero section, footer links |
| `industryExperience` | Experience section (with `metrics` for stat badges) |
| `researchExperience` | Research section |
| `projects` | `/work` archive + homepage featured cards |
| `skills` | Skills grid |
| `leadership` | Resume page only |

### Project fields

```jsonc
{
  "id": "unique-slug",
  "title": "Project Name",
  "description": "One-paragraph narrative (problem → approach → outcome)",
  "longDescription": ["Same as description", "Additional bullet 1", "..."],
  "tags": ["Tech", "Stack"],
  "status": "Completed",          // or "In Progress"
  "date": "2025-08-01",           // used to derive year label
  "githubUrl": "https://...",     // leave "" to hide the link
  "liveUrl": "https://...",       // leave "" to hide the link
  "featured": true,               // true = appears on homepage
  "category": "AI/ML",           // used for filter tabs on /work
  "metrics": { "key": "value" }, // optional stat badges
  "paperBadge": "...",           // optional paper/publication badge
  "inProgress": true             // optional amber "In Progress" badge
}
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, experience, featured projects, research, skills |
| `/work` | Full project archive with category filters and inline detail expansion |
| `/resume` | Role-targeted PDF downloads (Master, SDE, AI/ML) with descriptors |
| `/sitemap.xml` | Auto-generated sitemap for search engines |
| `/robots.txt` | Crawler rules |
