import { collection, doc, updateDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebaseStore } from './firebase'
import { useState } from 'react'
import { MovieList } from './MovieList'
import { Navbar } from './Navbar'
import { MovieCard } from './MovieCard'
import { MovieDetail } from './MovieDetail'
import useAuth from './auth'

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
    const [featuredMovieId, setFeaturedMovieId] = useState()
    const [user] = useAuth()

    function onMovieSelect(movieId) {
        setFeaturedMovieId(movieId)
    }

    const [movies, loading, error] = useCollectionData(moviesQuery)

    function getFeaturedMovie() {
        if (featuredMovieId && movies) {
            return movies.find((m) => m.id === featuredMovieId)
        }
    }

    const featuredMovie = getFeaturedMovie()

    async function onMovieLike(movieId) {
        const movie = movies.find((movie) => movie.id === movieId)
        if (movie) {
            let likes = movie.likes
            if (movie.dislikes.includes(user.uid)) return
            if (likes.includes(user.uid))
                likes = likes.filter((l) => l !== user.uid)
            else likes = [...likes, user.uid]

            const ref = doc(firebaseStore, 'movies', movieId)
            await updateDoc(ref, {
                ...movie,
                likes,
            })
        }
    }

    async function onMovieDislike(movieId) {
        const movie = movies.find((movie) => movie.id === movieId)
        if (movie) {
            let dislikes = movie.dislikes
            if (movie.likes.includes(user.uid)) return
            if (dislikes.includes(user.uid))
                dislikes = dislikes.filter((l) => l !== user.uid)
            else dislikes = [...dislikes, user.uid]

            const ref = doc(firebaseStore, 'movies', movieId)
            await updateDoc(ref, {
                ...movie,
                dislikes,
            })
        }
    }

    async function onReviewAdd(movieId, review) {
        if (review.length < 4) return
        const movie = movies.find((m) => (m.id === movieId))
        if (movie) {
            const newReview = {
                content: review,
                userId: user.uid,
                profile: user.photoURL,
                username: user.displayName,
            }
            const updatedMovie = {
                ...movie,
                reviews: [...movie.reviews, newReview],
            }
            const ref = doc(firebaseStore, 'movies', movieId)
            await updateDoc(ref, updatedMovie)
        }
    }

    return (
        <>
            <Navbar />

            <div className="flex justify-between max-w-4xl mx-auto mt-16">
                {loading && <p>Loading..</p>}
                {error && <p>{error.message}</p>}
                {movies && (
                    <>
                        <MovieList>
                            {movies.map((movie) => {
                                return (
                                    <MovieCard
                                        movie={movie}
                                        key={movie.id}
                                        onMovieSelect={onMovieSelect}
                                        onMovieDislike={onMovieDislike}
                                        onMovieLike={onMovieLike}
                                    />
                                )
                            })}
                        </MovieList>
                        {Boolean(movies.length) && (
                            <MovieDetail
                                movie={featuredMovie || movies[0]}
                                onMovieDislike={onMovieDislike}
                                onMovieLike={onMovieLike}
                                onReviewAdd={onReviewAdd}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default App
