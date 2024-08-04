// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnWTcw0vHA2kiuRg_LrPZqyl92cfZERkg",
  authDomain: "todo-list-e2699.firebaseapp.com",
  databaseURL: "https://todo-list-e2699-default-rtdb.firebaseio.com",
  projectId: "todo-list-e2699",
  storageBucket: "todo-list-e2699.appspot.com",
  messagingSenderId: "766457835678",
  appId: "1:766457835678:web:4a7b02b1fcca5b0ff44b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
