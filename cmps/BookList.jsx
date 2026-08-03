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
						<Link to={`/book/edit/${book.id}`}><button className="btn-edit">edit</button></Link>
					</div>
				</li>
			))}
		</ul>
	)
}

