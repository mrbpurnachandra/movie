import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useState } from 'react'
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage'
import { ref } from 'firebase/storage'
import useAuth, { signinWithGoogle, signout } from './auth'
import { firebaseStorage, firebaseStore } from './firebase'
import { addDoc, collection } from 'firebase/firestore'

export function Navbar() {
    const [user] = useAuth()

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
                <div>
                    {user ? <UserProfile user={user} /> : <SignInButton />}
                </div>
            </nav>
        </div>
    )
}

function UserProfile({ user }) {
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }

    function openModel() {
        setIsOpen(true)
    }
    return (
        <div className="flex items-center space-x-2">
            <div>
                <AddMovieButton onClick={openModel} />
                <MovieForm isOpen={isOpen} closeModal={closeModal} />
            </div>
            <div>
                <SignOutButton />
            </div>
            <img
                className="w-8 h-8 rounded-full object-cover object-center"
                src={user.photoURL}
                alt={user.displayName}
            />
        </div>
    )
}

function SignOutButton() {
    return (
        <button
            className="text-xs font-semibold text-gray-600 uppercase"
            onClick={signout}
        >
            Sign Out
        </button>
    )
}

function SignInButton() {
    return (
        <button
            className="text-xs font-semibold text-gray-600 uppercase"
            onClick={signinWithGoogle}
        >
            Sign In
        </button>
    )
}

function AddMovieButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-xs font-semibold text-green-800 uppercase"
        >
            Add Movie
        </button>
    )
}

function MovieForm({ isOpen, closeModal }) {
    const [name, setName] = useState('')
    const [trailer, setTrailer] = useState('')
    const [review, setReview] = useState('')
    const [uploadFile] = useUploadFile()
    const [posterRef, setPosterRef] = useState(null)
    const [posterUrl] = useDownloadURL(posterRef)

    const [user] = useAuth()

    function validateData() {
        return (
            name.length > 0 &&
            trailer.length > 20 &&
            review.length > 4 &&
            posterUrl
        )
    }

    const valid = validateData()

    async function handlePosterChange(e) {
        const file = e.target.files ? e.target.files[0] : undefined
        const storageRef = ref(firebaseStorage, `poster/${file.name}${Date()}`)

        if (file) {
            await uploadFile(storageRef, file, {
                contentType: 'image/jpeg',
            })
            setPosterRef(storageRef)
        } else {
            setPosterRef(null)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!valid) return

        const movie = {
            name,
            trailer,
            poster: posterUrl,
            userId: user.uid,
            reviews: [
                {
                    userId: user.uid,
                    profile: user.photoURL,
                    username: user.displayName,
                    content: review,
                },
            ],
            likes: [],
            dislikes: [],
        }

        const colRef = collection(firebaseStore, 'movies')
        await addDoc(colRef, movie)
        setName('')
        setReview('')
        setTrailer('')
        setPosterRef(null)
        closeModal()
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Movie
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please add those movies that you've
                                            recently watched.
                                        </p>
                                    </div>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-4 space-y-2"
                                    >
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="sr-only"
                                            >
                                                Movie Name
                                            </label>
                                            <input
                                                className="w-76 px-4 py-2 text-sm text-gray-600 rounded border focus:outline-none focus:ring-1 focus:ring-green-700"
                                                placeholder="Movie name"
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="flex space-x-4 items-center">
                                            <div>
                                                <label
                                                    htmlFor="trailer"
                                                    className="sr-only"
                                                >
                                                    Trailer
                                                </label>
                                                <input
                                                    className="w-48 px-4 py-2 text-sm text-gray-600 rounded border focus:outline-none focus:ring-1 focus:ring-green-700"
                                                    placeholder="Trailer"
                                                    type="text"
                                                    name="trailer"
                                                    value={trailer}
                                                    onChange={(e) =>
                                                        setTrailer(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="poster"
                                                    className="sr-only"
                                                >
                                                    Poster
                                                </label>
                                                <input
                                                    className="w-76 text-sm text-gray-600"
                                                    placeholder="Poster"
                                                    type="file"
                                                    name="poster"
                                                    onChange={
                                                        handlePosterChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="review"
                                                className="sr-only"
                                            >
                                                Review
                                            </label>
                                            <input
                                                className="w-76 px-4 py-2 text-sm text-gray-600 rounded border focus:outline-none focus:ring-1 focus:ring-green-700"
                                                placeholder="Your review"
                                                type="text"
                                                name="review"
                                                value={review}
                                                onChange={(e) =>
                                                    setReview(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                disabled={!valid}
                                                type="submit"
                                                className="px-4 py-2 text-sm bg-green-800 text-green-100 rounded font-semibold uppercase focus:outline-none disabled:bg-green-100 disabled:text-gray-600"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
