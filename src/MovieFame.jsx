import { HeartIcon, ThumbDownIcon } from '@heroicons/react/outline'
import useAuth from './auth'

export function MovieFame({ likes, dislikes, onMovieLike, onMovieDislike }) {
    const [user] = useAuth()

    const likeIconColor = likes.includes(user?.uid)
        ? 'text-green-800'
        : 'text-gray-500'
    const dislikeIconColor = dislikes.includes(user?.uid)
        ? 'text-green-800'
        : 'text-gray-500'

    return (
        <>
            <div className="flex items-center space-x-1">
                <button onClick={onMovieLike} disabled={!user}>
                    <HeartIcon
                        className={'w-5 '.concat(likeIconColor)}
                    />
                </button>
                <span className="text-sm text-gray-700">{likes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
                <button onClick={onMovieDislike} disabled={!user}>
                    <ThumbDownIcon
                        className={'w-5 '.concat(dislikeIconColor)}
                    />
                </button>
                <span className="text-sm text-gray-700">{dislikes.length}</span>
            </div>
        </>
    )
}
