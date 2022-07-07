export function MovieList({ children }) {
    const content = children.length ? (
        <div>
            <h3 className="text-gray-600">Recommendation</h3>
            <div className="space-y-4 mt-2">{children}</div>
        </div>
    ) : (
        <p>No movies</p>
    )
    return content
}
