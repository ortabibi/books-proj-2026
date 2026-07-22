export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <p>{book.subtitle}</p>
    </article>
}