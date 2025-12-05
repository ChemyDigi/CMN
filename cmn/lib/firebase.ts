// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB7JynC0aVDC6w7AxrCjqxVqX5pQsTguTU",
  authDomain: "cmn-products.firebaseapp.com",
  projectId: "cmn-products",
  storageBucket: "cmn-products.appspot.com", // ✅ fixed here
  messagingSenderId: "356579027784",
  appId: "1:356579027784:web:b34feff1ca50a8eaefe17d",
  measurementId: "G-TW8BNBXQLF"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);