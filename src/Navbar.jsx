import { SearchIcon } from '@heroicons/react/outline'
import useAuth, { signinWithGoogle, signout } from './auth'

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
                <div className="relative flex items-center group">
                    <SearchIcon className="absolute left-0 ml-2 self-center w-5 h-5 text-gray-400 stroke-1 group-focus-within:text-green-800" />
                    <input
                        type="text"
                        className="px-4 py-2 pl-8 w-76 text-sm text-gray-500 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-800"
                        placeholder="Find your favourite movie"
                    />
                </div>
                <div>
                    {user ? <UserProfile user={user} /> : <SignInButton />}
                </div>
            </nav>
        </div>
    )
}

function UserProfile({ user }) {
    return (
        <div className="flex items-center space-x-2">
            <div>
                <AddMovieButton/>
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

function AddMovieButton() {
    return (
        <button
        className="text-xs font-semibold text-green-800 uppercase"
        
    >
        Add Movie
    </button>   
    )
}
