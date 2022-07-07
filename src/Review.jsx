export function Review({ review }) {
    return (
        <div className="flex mt-3 space-x-3">
            <img
                className="flex-none w-8 h-8 object-cover object-center rounded-full shadow-lg"
                src={review.profile}
                alt={review.username}
            />

            <div className="border px-2 py-1 rounded-md">
                <p className="text-sm text-gray-700 leading-tight">
                    {review.content}
                </p>
            </div>
        </div>
    )
}
