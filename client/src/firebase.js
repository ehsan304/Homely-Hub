// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "homelyhub-39eda.firebaseapp.com",
    projectId: "homelyhub-39eda",
    storageBucket: "homelyhub-39eda.appspot.com",
    messagingSenderId: "96820693703",
    appId: "1:96820693703:web:c0f22fed02e87a722fcce2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);