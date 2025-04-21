// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//  TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-fec7b.firebaseapp.com",
  projectId: "car-marketplace-fec7b",
  storageBucket: "car-marketplace-fec7b.firebasestorage.app",
  messagingSenderId: "321025057069",
  appId: "1:321025057069:web:615c8e29308e22e13bb3a4",
  measurementId: "G-ER7WSJT0ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
