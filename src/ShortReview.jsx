export function ShortReview({ review }) {
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
