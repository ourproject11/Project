import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbaB2witKfnuBD5jdjo6sH3fQib1d2f5E",
  authDomain: "job-portal-efb7b.firebaseapp.com",
  databaseURL: "https://job-portal-efb7b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "job-portal-efb7b",
  storageBucket: "job-portal-efb7b.appspot.com",
  messagingSenderId: "886100198160",
  appId: "1:886100198160:web:03f8501938e7ba67731b95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db};