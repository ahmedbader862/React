

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut , sendSignInLinkToEmail  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { getFirestore, getDocs, collection, addDoc, setDoc, doc, onSnapshot, getDoc, updateDoc, deleteDoc, query, where, or, limit, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";



import { getDatabase, ref, set, push, get, child, onValue,update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
  appId: "1:876611807213:web:f9e4dcb492e4af7202a9e4",
  measurementId: "G-1J2E50QYKR",
 
  databaseURL:"https://fierfier-default-rtdb.firebaseio.com/"
  
};



const actionCodeSettings = {
  url: 'https://fierfier.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
  handleCodeInApp: true,
}
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();



const db = getFirestore(app);

const dbR = getDatabase(app);



window.firebaseConfig;
window.auth = auth ;
window.app = app ;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword ;
window.signInWithEmailAndPassword = signInWithEmailAndPassword ;
window.onAuthStateChanged = onAuthStateChanged ;
window.signOut = signOut ;  
window.sendSignInLinkToEmail = sendSignInLinkToEmail ;
window.actionCodeSettings = actionCodeSettings;

// 000000000000000000000000000000000000000000000000000000000000 fierstore
window.db = db ;  

window.collection = collection ;    

window.or = or ;    
window.limit = limit ;    
window.orderBy = orderBy ;    
window.getDocs = getDocs ;  
window.addDoc = addDoc ;  
window.setDoc = setDoc ;  
window.doc = doc ;  
window.getDoc = getDoc ;  
window.updateDoc = updateDoc ;  
window.deleteDoc = deleteDoc ;  
window.query = query ;  
window.setDoc = setDoc ;  
window.where = where ;  
window.onSnapshot = onSnapshot ;  

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% storge



//((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))) realtime

window.dbR = dbR;

window.ref = ref;
window.getDatabase = getDatabase;
window.set = set;
window.push = push;
window.get = get;
window.child = child;
window.onValue = onValue;
window.update = update;
