import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSi6CsEgAd4dPncaxMC8Ws5SHt5_VTtco",
  authDomain: "eagle-security-bangladesh.firebaseapp.com",
  projectId: "eagle-security-bangladesh",
  storageBucket: "eagle-security-bangladesh.appspot.com",
  messagingSenderId: "1076201514987",
  appId: "1:1076201514987:web:8daf387fcb9db889531bae",
  measurementId: "G-JH8K6EKGW6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)