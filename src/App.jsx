import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebaseStore } from './firebase'
import { useState } from 'react'
import { MovieList } from './MovieList'
import { Navbar } from './Navbar'
import { MovieCard } from './MovieCard'
import { MovieDetail } from './MovieDetail'

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

    function onMovieLike(movieId) {
        const movie = movies.find((movie) => movie.id === movieId)
        if (movie) {
            // get the userId
            // check if the userId is present
            // if present remove
            console.log(movie)
        }
    }

    function onMovieDislike(movieId) {}

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
                            />
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default App
