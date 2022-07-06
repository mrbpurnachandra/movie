import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firebaseStore } from './firebase'
import { HeartIcon, SearchIcon, ThumbDownIcon } from '@heroicons/react/outline'

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

function Navbar() {
    return (
        <div className="fixed w-full top-0 bg-gray-100">
            <nav className="max-w-4xl mx-auto py-2 flex items-center justify-between">
                <div>
                    <a href="/">
                        <svg
                            className="w-10"
                            viewBox="0 0 50 36"
                            fill="currentColor"
                        >
                            <path
                                d="M3.384 31V5.8H7.236L18.252 24.196H16.236L27.072 5.8H30.924L30.96 31H26.532L26.496 12.748H27.432L18.216 28.12H16.128L6.768 12.748H7.848V31H3.384Z"
                                fill="#CA8A04"
                            />
                            <path
                                d="M27.476 31V27.868L43.748 7.996L44.288 9.76H27.728V5.8H48.5V8.932L32.228 28.804L31.652 27.04H48.968V31H27.476Z"
                                fill="#166534"
                            />
                        </svg>
                    </a>
                </div>
                <div className="relative flex items-center group">
                    <SearchIcon className="absolute left-0 ml-2 self-center w-5 h-5 text-gray-400 stroke-1 group-focus-within:text-green-800" />
                    <input
                        type="text"
                        className="px-4 py-2 pl-8 w-76 text-sm text-gray-500 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-800"
                        placeholder="Find your favourite movie"
                    />
                </div>
                <div>
                    <img
                        className="w-8 h-8 rounded-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        alt="Profile"
                    />
                </div>
            </nav>
        </div>
    )
}

function MovieDetail() {
    return (
        <article className="w-96">
            <section>
                <img
                    className="w-full h-48 object-cover object-center rounded-lg shadow-lg"
                    src="https://filmfare.wwmindia.com/content/2022/apr/avatar241651147935.jpg"
                    alt="Avtar"
                />
            </section>
            <section className="mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Avtar</h3>
                <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-5 text-gray-500 stroke-1" />
                        <span className="text-sm text-gray-700">24</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ThumbDownIcon className="w-5 text-gray-500 stroke-1" />
                        <span className="text-sm text-gray-700">2</span>
                    </div>
                </div>
            </section>
            <section className="mt-6">
                <p className="text-sm text-gray-500">
                    What's your thought about this movie?
                </p>
                <div className="flex items-center space-x-2 mt-2">
                    <div>
                        <label className="sr-only" htmlFor="review">
                            Write Review
                        </label>
                        <input
                            className="w-76 px-4 py-2 text-sm text-gray-600 rounded border focus:outline-none focus:ring-1 focus:ring-green-700"
                            type="text"
                            name="review"
                            placeholder="Write review"
                        />
                    </div>
                    <button className="px-4 py-2 text-sm bg-green-800 text-green-100 rounded font-semibold uppercase focus:outline-none">
                        Post
                    </button>
                </div>
            </section>
            <section className="mt-4">
                <h4 className="text-gray-600">Reviews</h4>
                <div className="flex mt-3 space-x-3">
                    <img
                        className="flex-none w-8 h-8 object-cover object-center rounded-full shadow-lg"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="User Profile"
                    />

                    <div className="border px-2 py-1 rounded-md">
                        <p className="text-sm text-gray-700 leading-tight">
                            I remember being so absurdly hyped for this movie.
                        </p>
                    </div>
                </div>
                <div className="flex mt-2 space-x-3">
                    <img
                        className="flex-none w-8 h-8 object-cover object-center rounded-full shadow-lg"
                        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                        alt="User Profile"
                    />

                    <div className="border px-2 py-1 rounded-md">
                        <p className="text-sm text-gray-700 leading-tight">
                            I loved this movie.
                        </p>
                    </div>
                </div>
                <div className="flex mt-2 space-x-3">
                    <img
                        className="flex-none w-8 h-8 object-cover object-center rounded-full shadow-lg"
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="User Profile"
                    />

                    <div className="border px-2 py-1 rounded-md">
                        <p className="text-sm text-gray-700 leading-tight">
                            This movie made me cries a lot. Such a wonderful
                            relationship they all has. This movie almost related
                            to my life. We also lose our house few years
                            back(2010). And this movie gives me some confidence
                            in my life.
                        </p>
                    </div>
                </div>
            </section>
        </article>
    )}

function MoviePoster({ posterImg, name }) {
    return (
        <img
            className="w-full h-full object-cover object-center rounded-lg"
            src={posterImg}
            alt={name}
        />
    )
}

function MovieFame({ likesCount, dislikesCount }) {
    return (
        <>
            <div className="flex items-center space-x-1">
                <button>
                    <HeartIcon className="w-5 text-gray-500 stroke-1" />
                </button>
                <span className="text-sm text-gray-700">{likesCount}</span>
            </div>
            <div className="flex items-center space-x-1">
                <button>
                    <ThumbDownIcon className="w-5 text-gray-500 stroke-1" />
                </button>
                <span className="text-sm text-gray-700">{dislikesCount}</span>
            </div>
        </>
    )
}

function ShortReview({ review }) {
    const { profile, content, name } = review

    function clipReview(r) {
        // Make some change to fit the content to screen
        if (r.length <= 50) return r

        return r.slice(0, 50).concat('...')
    }

    const shortContent = clipReview(content)

    return (
        <>
            <img
                className="flex-none w-8 h-8 object-cover object-center rounded-full shadow-lg"
                src={profile}
                alt={name}
            />

            <div className="border px-2 py-1 rounded-md">
                <p className="text-sm text-gray-700 leading-tight">
                    {shortContent}
                </p>
            </div>
        </>
    )
}

function MovieCard() {
    return (
        <article className="flex items-center space-x-4 max-w-md p-4 border rounded-lg ">
            <section className="flex-none w-28 h-32">
                <MoviePoster
                    name="Spider Man"
                    posterImg="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                />
            </section>
            <section>
                <h3 className="text-lg font-semibold text-gray-800">
                    Spider Man: Homecoming
                </h3>
                <div className="flex items-center mt-1 space-x-4">
                    <MovieFame likesCount={24} dislikesCount={2} />
                </div>
                <div className="mt-2">
                    <a
                        className="text-sm text-gray-600 font-semibold hover:text-gray-500 transition-colors"
                        href="https://www.youtube.com/watch?v=rk-dF1lIbIg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Watch Trailer
                    </a>
                </div>
                <div className="flex mt-3 space-x-3">
                    <ShortReview
                        review={{
                            profile:
                                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                            content:
                                'I liked this content so much that my heart melted out.',
                            name: 'Prakash Bhattarai',
                        }}
                    />
                </div>
            </section>
        </article>
    )
}