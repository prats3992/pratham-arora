#!/usr/bin/env node

/**
 * Upload Resume Data to Firebase
 * 
 * This script uploads the resume data from resume-data.json to Firebase
 * Run with: node upload-resume-data.js
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, push } = require('firebase/database');
const fs = require('fs');
const path = require('path');

// Firebase configuration - make sure your .env.local file has these variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function uploadResumeData() {
  try {
    // Read the resume data
    const resumeDataPath = path.join(__dirname, 'resume-data.json');
    const resumeData = JSON.parse(fs.readFileSync(resumeDataPath, 'utf8'));

    console.log('📄 Loading resume data...');

    // Upload projects individually
    console.log('🚀 Uploading projects to Firebase...');
    const projectsRef = ref(database, 'projects');
    
    for (const project of resumeData.projects) {
      const { id, ...projectData } = project;
      await push(projectsRef, projectData);
      console.log(`✅ Uploaded project: ${project.title}`);
    }

    // Upload the complete resume data for backup
    console.log('💾 Uploading complete resume data...');
    const resumeRef = ref(database, 'resumeData');
    await set(resumeRef, {
      ...resumeData,
      projects: undefined, // Don't duplicate projects
      lastUpdated: new Date().toISOString()
    });

    console.log('🎉 Resume data uploaded successfully!');
    console.log(`📊 Uploaded ${resumeData.projects.length} projects`);
    console.log(`👔 Uploaded ${resumeData.experience.length} experience entries`);
    console.log(`🎓 Uploaded ${resumeData.education.length} education entries`);

  } catch (error) {
    console.error('❌ Error uploading resume data:', error);
    process.exit(1);
  }
}

// Check if running directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });
  
  if (!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) {
    console.error('❌ Firebase configuration not found. Make sure your .env.local file is set up correctly.');
    process.exit(1);
  }
  
  uploadResumeData();
}

module.exports = { uploadResumeData };
