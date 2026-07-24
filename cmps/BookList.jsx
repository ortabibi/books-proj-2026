import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSetSelectedBook }) {
    
	return (
		<ul className="book-list">
			{books.map(book => (
				<li key={book.id}>
					<BookPreview book={book} />
                    <button onClick={() => onRemoveBook(book.id)}>x</button>
                    <button onClick={() => onSetSelectedBook(book)}>Details</button>
				</li>
			))}
		</ul>
	)
}

