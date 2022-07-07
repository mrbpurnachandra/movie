export function ReviewList({ children }) {
    const content = children.length ? (
        <div>{children}</div>
    ) : (
        <p>No reviews yet</p>
    )

    return (
        <div>
            <h4 className="text-gray-600">Reviews</h4>
            {content}
        </div>
    )
}
