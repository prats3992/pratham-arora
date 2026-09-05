# Content Maintenance Guide
### How to add new material to the site going forward - CV updates, investigations, notes, and timeline entries

Keep this file at the repo root (e.g. `MAINTENANCE.md`) and re-read it before making any content change, or before handing a change to an AI assistant.

---

## 1. The four content stores - none of them sync automatically

This is the single most important thing to understand: there is **no longer one source of truth**. Updating `master-resume.tex` will NOT update your investigations, notes, or timeline - those are separate, hand-maintained files.

| Store | File(s) | Feeds | Updated by |
|---|---|---|---|
| **Academic CV** | `public/CV.tex` | Public CV download on `/about`, graduate applications, comprehensive academic record | Manual edit to `CV.tex`. (Replaces retired legacy `master-resume`, `sde`, and `aiml` resumes). |
| **Project Archive Data** | `resume-data.json` | `/work` flat archive, homepage track-record strip, `/about` factual headers | Direct edits to `resume-data.json` for project fields (`title`, `description`, `metrics`, `links`). |
| **Investigations** | `content/investigations.ts` | `/investigations` list + `/investigations/[slug]` detail pages | **Manual only** - hand-crafted research writeups |
| **Notes** | `content/notes.ts` | `/notes` list + `/notes/[slug]` detail pages | **Manual only** - dated engineering logs & reflections |
| **Timeline** | `content/timeline.ts` | Homepage friction-instinct timeline | **Manual only** - origin-story tools |

**Practical implication:** Outdated resume files (`master-resume`, `sde.pdf`, `aiml.pdf`) have been removed. When your academic CV updates, edit `public/CV.tex`. If you want to update the flat project archive on `/work`, edit `resume-data.json` directly. If you run a new experiment or build an origin-story tool, edit `content/investigations.ts`, `content/notes.ts`, or `content/timeline.ts`.

---

## 2. Decision tree - where does new material go?

Ask these in order:

1. **Is this a formal CV update (new academic publication, research assistantship, degree milestone, honors)?**
   → Edit `public/CV.tex`. This is your single, canonical academic CV.

2. **Is this a technical build, client project, or tool for the flat project archive?**
   → Edit `resume-data.json` directly.

3. **Does this project involve a genuine question, an experiment or comparison, an observation, and an interpretation - something you could write up in the Question → Approach → Experiment → Observation → Interpretation → Limitation → Next Question format?**
   → New entry in `content/investigations.ts`. Reserve this for your strongest 3–6 pieces of work. Don't add something here just because it exists - if it's solid engineering without a real inquiry behind it, it belongs in `resume-data.json`/`/work` instead (see Section 5's project-reframing test).

4. **Is this a shorter, single-idea reflection - a decision you made, a finding, something you're re-learning - that doesn't need the full seven-stage structure?**
   → New entry in `content/notes.ts`. 200–400 words, one idea, dated. This is the lowest-friction way to keep the site looking active between bigger updates - use it often.

5. **Is this a small, self-contained tool you built to remove a specific friction point in something you were doing yourself** (the basketball-app/Athleda-slides/clash-checker pattern) ** - evidence for the "builder instinct" thesis specifically?**
   → New entry in `content/timeline.ts`.

---

## 3. Exact schema for each manual content store

### `content/investigations.ts`
Required fields per entry (see existing entries for tone/length reference):
```
slug, title, subtitle, date, category, tags[], status,
question, approach, experiment, observation, interpretation, limitation, nextQuestion,
paperBadge?, paperCitation?, interactiveType? ("latency-comparator" | "vlm-error-browser" | "none"),
metrics? (Record<string,string>)
```
- Write `question` through `nextQuestion` in your own voice, using real numbers/quotes you actually have - never invent a `p` value, sample size, or finding.
- `interactiveType: "none"` is fine and expected for most future entries - you don't need a new interactive widget every time. Only propose a new interactive component (see Section 4) if the investigation has a genuinely distinct thing worth letting a visitor manipulate.
- `metrics` should only contain numbers that are true and specific - this renders in the margin-annotation rail, not as a colored badge (per the design principles in `globals.css` - see Section 6).

### `content/notes.ts`
```
slug, title, date, readingTime, category, summary, content[] (array of paragraph strings), tags[]
```
- `content` is an array of plain paragraphs, 3–6 entries typically. No headers, no bullet lists inside a note - keep it prose, matching the existing entries.
- Good note topics going forward: a specific technical decision and why, a specific thing you noticed while building or studying, a specific thing you're re-deriving from first principles and what clicked. Bad note topics: generic updates ("I started a new job"), anything without a specific, concrete detail.

### `content/timeline.ts`
```
id, year, title, context, domain ("Ergonomics & Tools" | "Systems & Data" | "Human-AI Interaction"),
friction, toolBuilt, takeaway, tags[], link?, linkText?
```
- `friction` / `toolBuilt` / `takeaway` should each be 1–3 sentences, matching the existing entries' density.
- Only add an entry here if it genuinely fits the "noticed a friction point in something I was doing myself, built a small tool to fix it" pattern. Don't stretch a project into this shape if it doesn't actually fit - it will read as forced.
- If a new `domain` category is genuinely needed, add it to the type union - but think hard before adding a fourth domain; three is doing real work distinguishing your project types.

---

## 4. If a new entry needs a new interactive component

Existing pattern: `components/latency-comparator.tsx`, `components/vlm-error-browser.tsx`, referenced via `interactiveType` in `content/investigations.ts` and rendered conditionally on the `[slug]` page.

Before building a new one, check:
- [ ] Does this genuinely let a visitor understand something a paragraph couldn't? (Re-apply the original test from the repositioning brief - don't add interactivity for its own sake.)
- [ ] Can it be built from static content you already have (a curated JSON array, a small parameter you can toggle) without a backend? Everything on this site is statically generated - keep it that way.
- [ ] Does it follow the design principles in Section 6 - one accent color, numbered sequence if applicable, no per-category rainbow coding, plain data over decorative chrome?

---

## 5. Reframing test for new projects (before deciding investigation vs. resume-only)

Ask: can you fill in all seven fields honestly, with real content, without padding?
- If yes → `content/investigations.ts`.
- If you can only fill in 2–3 of the fields with real substance and the rest would be generic filler → it's a resume/`/work` project, not an investigation. Don't force it.
- If it's solid delivery work with no real inquiry behind it (a freelance client site, a straightforward CRUD app) → resume-only, and that's fine - not everything needs to be reframed.

---

## 6. Design guardrails - do not regress these when adding new content

These are also documented as a comment block at the top of `app/globals.css` - repeated here so content edits don't accidentally violate them:
1. One accent color for data emphasis. Never introduce a second/third accent or a per-category color map for new tags, statuses, or domains.
2. Mono type only for actual measurements/data (dates, counts, stats) - not for decorative labels.
3. Numbered sequence markers only where the content is a genuine sequence (investigation stages, chronological timeline) - never a colored pill per category.
4. Cards only for genuinely comparable grid items (e.g., the investigations list). New content on prose-style pages (`/notes`, `/about`) should use rule dividers and whitespace, not boxes.
5. `→` only on links that leave the page/site (external links, PDF downloads) - never on internal navigation or "read more" links.
6. No new ALL-CAPS eyebrow label above a heading unless the heading is genuinely ambiguous without it.

If you're asking an AI assistant to draft new content or components, paste this section in along with the request.

---

## 7. Reusable prompt templates

### A - "I have new CV/resume information to add"
```
I want to add [new job / project / course / skill] to my site.

Here's the raw information: [paste details - role, dates, org, what you did, any real
numbers/outcomes]

Steps:
1. Add/update this in public/master-resume.tex (and sde.tex/aiml.tex if relevant to those
   variants) following the existing \resumeExperienceHeading / \resumeItem format.
2. Confirm resume-data.json-only fields (featured, metrics, paperBadge, inProgress,
   category, githubUrl, liveUrl, id, date, status) are set directly in resume-data.json
   if needed - the sync script will not create or infer these.
3. Tell me whether this also deserves a content/investigations.ts, content/notes.ts, or
   content/timeline.ts entry per the decision tree in MAINTENANCE.md Section 2, and ask
   me for the missing details (don't invent them) if so.
4. Do not touch app/globals.css, tailwind.config.ts, or the visual treatment of any
   component as part of this change.
```

### B - "I want to add a new investigation/note/timeline entry"
```
I want to add a new [investigation / note / timeline entry] to the site.

Here's what actually happened, in my own words: [paste raw material - what you were
curious about, what you tried, what you found, any real numbers, what you'd still
want to know]

Requirements:
- Use the exact schema for this content type from MAINTENANCE.md Section 3.
- Do not invent numbers, quotes, or outcomes I haven't given you. If a field can't be
  filled with real content, tell me what's missing instead of writing filler.
- Match the tone/density of the existing entries in content/[investigations|notes|
  timeline].ts - read a couple of them first for calibration.
- Apply the design guardrails in MAINTENANCE.md Section 6 to any new component or
  styling this requires.
- If this could plausibly be a resume-only project instead of a full investigation,
  say so and ask me before writing a padded version - use the reframing test in
  Section 5.
- Update app/sitemap.ts if this creates a new route/slug that isn't already covered
  by a dynamic [slug] pattern.
```

### C - "General site audit before a batch of changes"
```
Before making changes, check:
1. Does resume-data.json match the latest master-resume.tex? (Diff them or re-run
   scripts/sync_resume.py.)
2. Are there any new jobs/projects in resume-data.json that should also have a
   content/investigations.ts, content/notes.ts, or content/timeline.ts entry, per
   the decision tree in MAINTENANCE.md Section 2, but don't yet?
3. Grep for uppercase tracking, rounded-lg/rounded-md, text-2xs, and → usage across
   app/ and components/ to confirm no new content has reintroduced the old
   template-chrome patterns (see MAINTENANCE.md Section 6).
4. Confirm app/sitemap.ts lists every current route.
```