// src/services/api.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0j-PemNzrW6Cxdjpc1pxQjFNuhkvy_7M",
  authDomain: "portfolio-f0cb7.firebaseapp.com",
  projectId: "portfolio-f0cb7",
  storageBucket: "portfolio-f0cb7.firebasestorage.app",
  messagingSenderId: "543974218288",
  appId: "1:543974218288:web:a8eb0c8eb8a352b8c0abf5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data Shape Placeholder (prevents crashes if DB is empty)
export const PLACEHOLDERS = {
    hero: { name: "Your Name", title: "PORTFOLIO", year: "2025", stats: { certs: 0, skills: 0, projects: 0 } },
    mission: { title: "Mission Title", text: "Mission text...", image: "" },
    skills: [], projects: [], certificates: [], socials: []
};

// --- READ (Used by Portfolio & Admin) ---
export const fetchPortfolioData = async () => {
    try {
        const docRef = doc(db, "portfolio", "main-content");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.warn("No data found, using placeholders.");
            return PLACEHOLDERS;
        }
    } catch (error) {
        console.error("API Error:", error);
        return PLACEHOLDERS;
    }
};

// --- WRITE (Used by Admin Only) ---
export const savePortfolioData = async (data) => {
    try {
        // Recalculate stats before saving
        const stats = {
            skills: data.skills?.length || 0,
            projects: data.projects?.length || 0,
            certs: data.certificates?.length || 0
        };
        
        const payload = {
            ...data,
            hero: { ...data.hero, stats }
        };

        await setDoc(doc(db, "portfolio", "main-content"), payload);
        return { success: true };
    } catch (error) {
        console.error("Save Error:", error);
        return { success: false, error };
    }
};

// --- AUTH UTILS ---
export const checkCredentials = (user, pass) => {
    return user === "admin" && pass === "1234";
};