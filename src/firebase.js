import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAl1MDlV3YooiHiT-1Je3zrYyAb1Tgzmpc",
    authDomain: "vegas-circle-c722c.firebaseapp.com",
    projectId: "vegas-circle-c722c",
    storageBucket: "vegas-circle-c722c.appspot.com",
    messagingSenderId: "176549367428",
    appId: "1:176549367428:web:d2d7687a4160cc616d7cd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()