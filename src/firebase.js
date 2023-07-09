// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXy84xtrzWKW03mlU-VgtH8G_JlU1Bnmc",
    authDomain: "realtor-clone-fc99b.firebaseapp.com",
    projectId: "realtor-clone-fc99b",
    storageBucket: "realtor-clone-fc99b.appspot.com",
    messagingSenderId: "52180339761",
    appId: "1:52180339761:web:bd0bd316410dd63698d910",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
