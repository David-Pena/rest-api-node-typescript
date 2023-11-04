import { getApp, getApps, initializeApp } from 'firebase/app';
import admin from 'firebase-admin';

// admin.initializeApp();

async function loadAdminSdk () {
  const serviceAccount = await import(`../../../${process.env.FIREBASE_SERVICE_ACCOUNT}`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

void loadAdminSdk();

export const app = !getApps().length ? initializeApp(config) : getApp();
export const sdkAdmin = admin;
