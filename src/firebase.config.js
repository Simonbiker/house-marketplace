// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/getFirestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG2NAuXnosBRD--bUyXyYMkCR5-hdvrtA",
    authDomain: "house-marketplace-app-70d38.firebaseapp.com",
    projectId: "house-marketplace-app-70d38",
    storageBucket: "house-marketplace-app-70d38.appspot.com",
    messagingSenderId: "240657161191",
    appId: "1:240657161191:web:7fa8fc53c78002d1ca3b42"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();