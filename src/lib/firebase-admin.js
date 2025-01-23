import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

try {
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error('Firebase admin initialization error', error);
}

export const adminAuth = getAuth(); 