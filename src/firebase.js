import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyDBOHM7mrw7oLS3j0UfjAjS-f5qUWYd0FM",
    authDomain: "movieszone-8e882.firebaseapp.com",
    projectId: "movieszone-8e882",
    storageBucket: "movieszone-8e882.appspot.com",
    messagingSenderId: "518016824169",
    appId: "1:518016824169:web:9ef1e988596d67c44c03f8"
})

export const firebaseStore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)

