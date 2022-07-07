import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { useEffect } from 'react'
import { useState } from 'react'
import { firebaseAuth } from './firebase'

function useAuth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (u) => {
            setUser(u)
        })

        return () => unsubscribe()
    }, [])

    return [user]
}

export default useAuth

const googleProvider = new GoogleAuthProvider()
export function signinWithGoogle() {
    return signInWithPopup(firebaseAuth, googleProvider)
}

export function signout() {
    return signOut(firebaseAuth)
}
