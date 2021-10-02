// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy0pcwK5wIlDKON7-Kq_llIUc2anYruvc",
  authDomain: "wemarket-a8540.firebaseapp.com",
  projectId: "wemarket-a8540",
  storageBucket: "wemarket-a8540.appspot.com",
  messagingSenderId: "670210428924",
  appId: "1:670210428924:web:505e786bfa91db254cec79",
  measurementId: "G-9XN3R9WJDN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
