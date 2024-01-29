import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBAvjgdP-uU9S8fR74BGVsTOimoVo_O_50",
    authDomain: "contact-3d84d.firebaseapp.com",
    projectId: "contact-3d84d",
    storageBucket: "contact-3d84d.appspot.com",
    messagingSenderId: "492653120901",
    appId: "1:492653120901:web:952244cf232c0fba7088ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);