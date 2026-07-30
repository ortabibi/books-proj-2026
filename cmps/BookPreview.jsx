export function BookPreview({ book }) {
    return <article className="book-preview">
        <img src={book.thumbnail} alt="" />
        <h2>{book.title}</h2>
    </article>
}