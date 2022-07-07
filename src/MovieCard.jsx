import { MoviePoster } from './MoviePoster'
import { MovieFame } from './MovieFame'
import { ShortReview } from './ShortReview'

export function MovieCard({
    movie,
    onMovieSelect,
    onMovieLike,
    onMovieDislike,
}) {
    return (
        <article className="flex items-center space-x-4 max-w-md p-4 border rounded-lg">
            <section className="flex-none">
                <button
                    className="w-28 h-32"
                    onClick={() => onMovieSelect(movie.id)}
                >
                    <MoviePoster name={movie.name} posterImg={movie.poster} />
                </button>
            </section>
            <section>
                <h3 className="text-lg font-semibold text-gray-800">
                    {movie.name}
                </h3>
                <div className="flex items-center mt-1 space-x-4">
                    <MovieFame
                        likes={movie.likes}
                        dislikes={movie.dislikes}
                        onMovieDislike={() => onMovieDislike(movie.id)}
                        onMovieLike={() => onMovieLike(movie.id)}
                    />
                </div>
                <div className="mt-2">
                    <a
                        className="text-sm text-gray-600 font-semibold hover:text-gray-500 transition-colors"
                        href={movie.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Watch Trailer
                    </a>
                </div>
                <div className="flex mt-3 space-x-3">
                    <ShortReview review={movie.reviews[0]} />
                </div>
            </section>
        </article>
    )
}
