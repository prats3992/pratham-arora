import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

// Firebase configuration
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
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const database = getDatabase(app);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const messagesRef = ref(database, 'contactMessages');
    await push(messagesRef, {
      name,
      email,
      subject,
      message,
      timestamp: serverTimestamp(),
    });

    return Response.json({ message: 'Message received successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving message to Firebase:', error);
    return Response.json({ message: 'Error processing your request' }, { status: 500 });
  }
}
