const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {

	return (
		<ul className="book-list">
			{books.map(book => (
				<li key={book.id}>
					<BookPreview book={book} />

					<div className="actions">
						<button onClick={() => onRemoveBook(book.id)}>x</button>
						<Link to={`/book/${book.id}`}><button className="btn-details">Details</button></Link>
					</div>
				</li>
			))}
		</ul>
	)
}

