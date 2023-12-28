import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLffTrN_ydi7zTQSI7CGU1IN9uW7GE4AM",
  authDomain: "encrypt-56ab8.firebaseapp.com",
  projectId: "encrypt-56ab8",
  storageBucket: "encrypt-56ab8.appspot.com",
  messagingSenderId: "405923226720",
  appId: "1:405923226720:web:a79532867fef3c442e0f05",
  measurementId: "G-YGXTBL681Z"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore(app);

export {auth,database}