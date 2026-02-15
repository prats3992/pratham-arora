/**
 * Firebase Seed Script
 * 
 * Clears existing projects in Firebase and re-seeds from resume-data.json.
 * 
 * Usage:
 *   npx tsx scripts/seed-firebase.ts
 * 
 * Requires NEXT_PUBLIC_FIREBASE_* env vars to be set (reads from .env.local).
 */

import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"
import { readFileSync } from "fs"
import { resolve } from "path"
import { config } from "dotenv"

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") })

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate config
const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missing.length > 0) {
  console.error("Missing Firebase env vars:", missing.join(", "))
  console.error("Make sure .env.local is present with NEXT_PUBLIC_FIREBASE_* variables.")
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

async function seed() {
  // Read resume data
  const raw = readFileSync(resolve(process.cwd(), "resume-data.json"), "utf-8")
  const data = JSON.parse(raw)

  const projects: Record<string, unknown> = {}

  for (const project of data.projects) {
    const { id, ...rest } = project
    projects[id] = rest
  }

  console.log(`Seeding ${Object.keys(projects).length} projects...`)

  // Clear and set all projects
  const projectsRef = ref(db, "projects")
  await set(projectsRef, projects)

  console.log("Done. Firebase projects collection has been replaced.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
