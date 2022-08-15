import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// export const firebaseApp = initializeApp({
//     apiKey: "AIzaSyDBOHM7mrw7oLS3j0UfjAjS-f5qUWYd0FM",
//     authDomain: "movieszone-8e882.firebaseapp.com",
//     projectId: "movieszone-8e882",
//     storageBucket: "movieszone-8e882.appspot.com",
//     messagingSenderId: "518016824169",
//     appId: "1:518016824169:web:9ef1e988596d67c44c03f8"
// })
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAyq9jAlwZD0L42Qip6am9SsIV-DzZ8des",
    authDomain: "movie-zone-2ca05.firebaseapp.com",
    projectId: "movie-zone-2ca05",
    storageBucket: "movie-zone-2ca05.appspot.com",
    messagingSenderId: "827825929083",
    appId: "1:827825929083:web:5f9ca0743b33e68af1dbde"
});

export const firebaseStore = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)