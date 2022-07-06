import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebaseStore } from './firebase'

const converter = {
    toFirestore(movie) {
        return movie
    },

    fromFirestore(snapshot) {
        const movie = snapshot.data()
        return {
            ...movie,
            id: snapshot.id,
        }
    },
}

const moviesQuery = collection(firebaseStore, 'movies').withConverter(converter)

function App() {
    const [movies, loading, error] = useCollectionData(moviesQuery)

    if (loading) return <p>Loading..</p>

    if (error) return <p>{error.message}</p>
    
    return <pre>{JSON.stringify(movies, null, 2)}</pre>
}

export default App
