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

## Updating Firebase from resume-data.json

This site uses a two-part data architecture:
- **Static pages** (homepage, resume) read directly from `resume-data.json`
- **Work page** reads project data from Firebase Realtime Database

### When to Sync

After updating `resume-data.json` with new projects or experience, you must sync the data to Firebase so the work page reflects the changes:

```bash
pnpm seed
```

This script clears the existing `projects` collection in Firebase and re-populates it with all project entries from `resume-data.json`.

### Prerequisites

- Ensure `NEXT_PUBLIC_FIREBASE_*` environment variables are set in `.env.local`:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- You must have write access to the Firebase Realtime Database

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — full profile overview |
| `/work` | All projects with category filters and inline detail expansion |
| `/resume` | Resume with role-targeted PDF downloads |
