import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
apiKey: "AIzaSyAIysxeeH4Sc0QjMtdMt4ZSYl915O5PPVE",
  authDomain: "airqualityapp2025.firebaseapp.com",
  projectId: "airqualityapp2025",
  storageBucket: "airqualityapp2025.firebasestorage.app",
  messagingSenderId: "1048948801161",
  appId: "1:1048948801161:web:c8f7c5dfe0d67a77601058",
  measurementId: "G-HLW98Z2EK9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);