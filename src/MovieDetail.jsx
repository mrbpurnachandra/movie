import { useState } from 'react'
import useAuth from './auth'
import { MovieFame } from './MovieFame'
import { MoviePoster } from './MoviePoster'
import { Review } from './Review'
import { ReviewList } from './ReviewList'

export function MovieDetail({ movie, onMovieLike, onMovieDislike }) {
    return (
        <article className="w-96">
            <section className="h-48">
                <MoviePoster name={movie.name} posterImg={movie.poster} />
            </section>
            <section className="mt-2">
                <h3 className="text-lg font-semibold text-gray-800">
                    {movie.name}
                </h3>
                <div className="flex items-center mt-2 space-x-4">
                    <MovieFame
                        likes={movie.likes}
                        dislikes={movie.dislikes}
                        onMovieLike={() => onMovieLike(movie.id)}
                        onMovieDislike={() => onMovieDislike(movie.id)}
                    />
                </div>
            </section>
            <section className="mt-6">
                <ReviewForm key={movie.id} />
            </section>
            <section className="mt-4">
                <ReviewList>
                    {movie.reviews.map((review, i) => (
                        <Review review={review} key={i} />
                    ))}
                </ReviewList>
            </section>
        </article>
    )
}

function ReviewForm({ onReviewUpdate }) {
    const [review, setReview] = useState('')
    const [user] = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        setReview('')
        console.log(review)
        onReviewUpdate(review)
    }

    return (
        <>
            <p className="text-sm text-gray-500">
                What's your thought about this movie?
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2 mt-2"
            >
                <div>
                    <label className="sr-only" htmlFor="review">
                        Write Review
                    </label>
                    <input
                        className="w-76 px-4 py-2 text-sm text-gray-600 rounded border focus:outline-none focus:ring-1 focus:ring-green-700"
                        type="text"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write review"
                    />
                </div>
                <button
                    disabled={!user}
                    className="px-4 py-2 text-sm bg-green-800 text-green-100 rounded font-semibold uppercase focus:outline-none disabled:bg-green-100 disabled:text-gray-600"
                >
                    Post
                </button>
            </form>
        </>
    )
}
