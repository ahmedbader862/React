// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXEQhdNyJkZpliy0V4AJQoxYOh13KEgJg",
  authDomain: "fierfier.firebaseapp.com",
  databaseURL: "https://fierfier-default-rtdb.firebaseio.com",
  projectId: "fierfier",
  storageBucket: "fierfier.appspot.com",
  messagingSenderId: "876611807213",
  appId: "1:876611807213:web:0504918304d5497302a9e4",
  measurementId: "G-6801F058SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);