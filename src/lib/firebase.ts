import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Resolve config for maximum compatibility across different bundlers/ESM environments
const actualConfig = (firebaseConfig as any).default || firebaseConfig;

let app: any;
try {
  app = initializeApp(actualConfig);
} catch (e) {
  console.warn("Firebase initializeApp failed:", e);
}

// Initialize Firestore with the specific databaseId if defined, otherwise default
let db: any;
try {
  db = app ? getFirestore(app, actualConfig.firestoreDatabaseId || undefined) : {};
} catch (e) {
  console.warn("Firebase Firestore initialization failed:", e);
  db = {};
}

// Initialize and export Auth
let auth: any;
try {
  auth = app ? getAuth(app) : null;
} catch (e) {
  console.warn("Firebase Auth initialization failed:", e);
}

// Ensure auth is not null/undefined to prevent runtime import crashes
if (!auth) {
  auth = {
    currentUser: null,
    _isMock: true,
    onAuthStateChanged: (callback: any) => {
      // Return a dummy unsubscribe function
      return () => {};
    }
  } as any;
}

export { db, auth };

