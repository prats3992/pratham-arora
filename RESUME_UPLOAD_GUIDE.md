# Resume Data Upload Guide

This directory contains the structured resume data that can be uploaded to Firebase to populate your portfolio website.

## Files Created:

### 1. `resume-data.json`
Complete resume data in JSON format including:
- Personal information
- Education history
- Work experience
- Leadership roles
- Technical skills
- Projects
- Hobbies

### 2. `firebase-projects-upload.json` 
Projects data formatted specifically for Firebase upload. This matches the exact structure your app expects:
- Each project has a unique key
- Contains all required fields: title, description, tags, status, date, githubUrl, liveUrl, featured
- Ready to be imported directly to Firebase Realtime Database

### 3. `upload-resume-data.js`
Node.js script to automatically upload data to Firebase (requires Firebase SDK)

## How to Upload to Firebase:

### Option 1: Manual Upload (Recommended)
1. Go to your Firebase Console
2. Navigate to Realtime Database
3. Go to the `projects` node (or create it)
4. Import the `firebase-projects-upload.json` file directly
5. The data will be automatically structured correctly

### Option 2: Using Firebase Console Import
1. In Firebase Console, go to Realtime Database
2. Click the three dots menu → Import JSON
3. Select `firebase-projects-upload.json`
4. Choose to import to the `projects` path

### Option 3: Using the Upload Script
1. Install dependencies: `npm install firebase dotenv`
2. Make sure your `.env.local` file has the Firebase config
3. Run: `node upload-resume-data.js`

## Updated Resume Page Features:

✅ **Personal Information**: Updated with your actual contact details
✅ **Education**: Plaksha University with correct CGPA and dates  
✅ **Experience**: All 5 internships/roles from your resume
✅ **Skills**: Comprehensive technical skills organized by category
✅ **Projects**: 5 featured projects from your resume
✅ **Leadership**: Club positions and activities
✅ **Statistics**: Live project count (11+ projects, 5+ roles, etc.)
✅ **Download**: Links to your LaTeX resume source

## Project Statistics Updated:
- **Dynamic Project Count** (shows actual count from Firebase)
- **Dynamic Technology Count** (counts unique tags from all projects)
- **Dynamic Featured Projects** (counts projects marked as featured)
- **3+ Years of Adventure** (static, based on your development journey)

## Important Changes Made:

🗑️ **Removed Placeholder Data**: All placeholder projects have been removed from:
- Projects page (`/app/projects/page.tsx`)
- Home page (`/app/page.tsx`)
- No more hardcoded "AI Pathfinding Visualizer" or "Smart Home API" examples

📊 **Dynamic Statistics**: All counts now pull from real Firebase data:
- Project counts update automatically
- Technology counts based on actual project tags
- Featured project counts from your real featured projects

⚠️ **Upload Required**: The site will show empty states until you upload the `firebase-projects-upload.json` to Firebase

The resume page now accurately reflects your experience and achievements from the LaTeX resume, and all project pages use real data from Firebase!
