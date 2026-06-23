import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9bolZfOM-VjcthhSzUE4dSpz8nbXqrFs",
  authDomain: "medly-74a38.firebaseapp.com",
  projectId: "medly-74a38",
  storageBucket: "medly-74a38.firebasestorage.app",
  messagingSenderId: "502286119793",
  appId: "1:502286119793:web:e3b23b0d655d33e25ebcd0",
  measurementId: "G-7M0EDBC6SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);

// Initialize and export Auth
export const auth = getAuth(app);
