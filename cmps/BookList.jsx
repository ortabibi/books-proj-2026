import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveCar, onSetSelectedCar }) {
    console.log(books);
    
	return (
		<ul className="book-list">
			{books.map(book => (
				<li key={book.id}>
					<BookPreview book={book} />
                    {/* <button onClick={() => onRemoveCar(book.id)}>x</button> */}
                    {/* <button onClick={() => onSetSelectedCar(book)}>Details</button> */}
				</li>
			))}
		</ul>
	)
}

