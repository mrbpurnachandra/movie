import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDQTF7jgpb8w5LNEdbXk-zyb2uogXNg1zs",
  authDomain: "movie-zone-b9980.firebaseapp.com",
  projectId: "movie-zone-b9980",
  storageBucket: "movie-zone-b9980.appspot.com",
  messagingSenderId: "338054027425",
  appId: "1:338054027425:web:49dd2f6c3c2927b7fff8e0",
});

export const firebaseStore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
