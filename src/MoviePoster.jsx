export function MoviePoster({ posterImg, name }) {
    return (
        <img
            className="w-full h-full object-cover object-center rounded-lg"
            src={posterImg}
            alt={name}
        />
    )
}
