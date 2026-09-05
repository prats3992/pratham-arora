# Pratham Arora - Research Notebook & Technical Portfolio

Personal research notebook and technical portfolio of **Pratham Arora**, final-year Computer Science & AI student at Plaksha University ('26), studying human-AI interaction under pressure, failure mode characterization in vision-language models, and building self-tested developer tools.

**Live Site:** [pratham-arora.vercel.app](https://pratham-arora.vercel.app)

---

## Core Thesis

> *“I keep building small, self-tested tools to remove friction from tasks I do myself - and now that AI sits inside almost everything I build or am evaluated with, I want to study what that presence does to a person's actual skill and their trust in it.”*

The site is organized around two complementary lines of inquiry:
1. **Building with AI in the loop:** System durability vs. latency tradeoffs (Cotality code RAG), physical grounding failure modes across 459 instrument-measured benchmark images (AAAI '27), and wait-state latency communication in conversational VR (MIT Presence).
2. **The pre-AI builder instinct:** A chronological progression of tools built to eliminate direct personal friction (court-side basketball scoring app, browser-based athlete auction slide generator, cohort timetable clash visualizer).

---

## Site Architecture & Routing

| Route | Purpose | Key Components |
|---|---|---|
| **`/`** | Homepage & Thesis | Origin-story timeline (`FrictionTimeline`), centerpiece inquiries, compact track record, foundations & stack |
| **`/investigations`** | Inquiry-driven research writeups | 7-stage sequential inquiry cards (*Question → Approach → Experiment → Observation → Interpretation → Limitation → Next Question*) |
| **`/investigations/[slug]`** | Investigation deep dives | Interactive testbeds (`LatencyComparator`, `VlmErrorBrowser`), sticky margin-annotation metadata rail, paper citations |
| **`/notes`** | Technical notes stream | Dated engineering logs on systems engineering, vector storage, VLM heuristics, and first-principles mathematics |
| **`/notes/[slug]`** | Note deep dives | Focused, single-idea technical reflections |
| **`/about`** | Academic background & CV | Questions under active study, publications, experience, and academic CV download (`/CV.tex`) |
| **`/work`** | Flat project catalog | Complete archive of software builds and research engineering implementations using native accessible `<details>`/`<summary>` |
| **`/resume`** | Redirect route | Automatically redirects to `/about` |

---

## Content Stores & Maintenance

Content is cleanly decoupled across dedicated, hand-maintained stores. For complete schema details, decision trees, and reusable prompts, see [`MAINTENANCE.md`](./MAINTENANCE.md).

- **Academic CV (`public/CV.tex`):** The single, canonical academic Curriculum Vitae (LaTeX source). Legacy variant resumes (`master-resume`, `sde`, `aiml`) have been deprecated and retired.
- **Research Inquiries (`content/investigations.ts`):** Structured 7-stage research writeups and diagnostic measurements.
- **Technical Notes (`content/notes.ts`):** Dated engineering notes and decision logs.
- **Origin-Story Timeline (`content/timeline.ts`):** Chronological log of friction-instinct tools (2022–2025).
- **Project Archive Data (`resume-data.json`):** Feeds the flat project catalog on `/work` and homepage track-record strip.

---

## Design System & Theming

Grounded in an instrumentation / laboratory notebook aesthetic rather than generic template chrome:

- **Single Accent Discipline:** Mint (`#6EE7B7`) in dark mode; deep calibrated teal-emerald (`#0D9488`, >4.5:1 contrast) in light mode. No categorical rainbow badges.
- **Dual Themes:**
 - **Dark Mode (`html.dark`):** Deep laboratory surface palette (`#0C0C0E` base, `#161618` elevated, `#2A2A2D` border).
 - **Light Mode (`:root`):** Technical drafting paper parchment palette (`#FBFBF9` base, `#F3F3EE` elevated, `#E0E0D8` hairline rule).
 - **Zero FOUC:** Synchronous `<head>` script prevents theme flicker on load.
- **Mobile Collapsible Navigation:** Accessible slide-down drawer with backdrop blur, &ge;44px touch targets, and `Escape`/route-change auto-closing.
- **Page Entrance Transitions:** Hardware-accelerated 220ms subtle fade and 6px upward glide (`app/template.tsx`), automatically respecting `prefers-reduced-motion`.
- **Measurement Hairlines:** `.rule-ticked` dividers render calibrated tick marks along section breaks in both light and dark palettes.
- **Responsive Favicon:** Dynamic SVG favicon (`app/icon.svg`) with CSS media queries adapting to light and dark browser chrome, paired with `/favicon.ico`.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS (v3 with class-based theming) & Vanilla CSS variables
- **Typography:** Space Grotesk (headings), IBM Plex Sans (body), IBM Plex Mono (telemetry/measurements)
- **Analytics:** `@vercel/analytics` and `@vercel/speed-insights`
- **Hosting:** Vercel

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build production static bundle (compiles all 19 static routes)
pnpm build

# Serve production build locally
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
