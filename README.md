# pratham-arora

Personal portfolio site — CS & AI undergraduate at Plaksha University.

**Live:** [pratham-arora.vercel.app](https://pratham-arora.vercel.app)

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Firebase Realtime Database
- **Fonts:** Space Grotesk, IBM Plex Sans, IBM Plex Mono
- **Hosting:** Vercel

## Structure

```
app/
  page.tsx          # Home — identity, experience, research, featured projects, skills
  work/page.tsx     # Project archive — Firebase-backed, filterable, expandable
  resume/page.tsx   # Resume — downloadable PDFs, structured from resume-data.json
  not-found.tsx     # 404
components/
  site-nav.tsx      # Sticky header navigation
  metric-card.tsx   # Reusable metric display component
lib/
  firebase.ts       # Firebase singleton
  utils.ts          # cn() utility
scripts/
  seed-firebase.ts  # Clears and re-seeds Firebase from resume-data.json
```

## Development

```bash
pnpm install
pnpm dev
```

## Seeding Firebase

Pushes all projects from `resume-data.json` into Firebase Realtime Database:

```bash
pnpm seed
```

Requires `NEXT_PUBLIC_FIREBASE_*` env vars in `.env.local` and write access to the database.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — full profile overview |
| `/work` | All projects with category filters and inline detail expansion |
| `/resume` | Resume with role-targeted PDF downloads |
