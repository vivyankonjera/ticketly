// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHO8fFwB5rko1t55bBfoX83g42dtUHisw",
    authDomain: "ticketly-43714.firebaseapp.com",
    projectId: "ticketly-43714",
    storageBucket: "ticketly-43714.appspot.com",
    messagingSenderId: "96184261275",
    appId: "1:96184261275:web:dab791c1c0600a5239043e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
