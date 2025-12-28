import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBFN8wZv8phKCw6U909mT2pNa4nHjAJqjU",
    authDomain: "yogaapp-844fb.firebaseapp.com",
    projectId: "yogaapp-844fb",
    storageBucket: "yogaapp-844fb.firebasestorage.app",
    messagingSenderId: "91574575540",
    appId: "1:91574575540:web:8e71b77d433e59ea9a52e1",
    measurementId: "G-755YXWXRGR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
