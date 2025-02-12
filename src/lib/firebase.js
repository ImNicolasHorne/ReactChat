import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-2f056.firebaseapp.com",
  projectId: "reactchat-2f056",
  storageBucket: "reactchat-2f056.firebasestorage.app",
  messagingSenderId: "203060137755",
  appId: "1:203060137755:web:cfe28f7e4fcf59e948cdbe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();