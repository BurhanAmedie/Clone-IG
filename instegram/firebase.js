// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpsA1Dg5zTp46ZeG2pbHI9ZRp7MYMOZI0",
  authDomain: "instegram-83756.firebaseapp.com",
  projectId: "instegram-83756",
  storageBucket: "instegram-83756.appspot.com",
  messagingSenderId: "567473605343",
  appId: "1:567473605343:web:6d7c27fcb35dd4658ff76a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export { app, db, storage}