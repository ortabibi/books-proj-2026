const { useState, useEffect } = React

import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [filterBy])


    function loadBooks() {
        return bookService.query(filterBy)
            .then(books => setBooks(books))
    }

    function onRemoveBook(bookId) {
        // Remove data from storage
        // Only then from state

        bookService.remove(bookId)
            .then(() => setBooks(prev =>
                prev.filter(book => book.id !== bookId)))
    }

    function onSetSelectedBook(book) {
        setSelectedBook(book)
    }


    return <section className="book-index">
        <BookFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy} />

        <BookList
            books={books}
            onRemoveBook={onRemoveBook}
            onSetSelectedBook={onSetSelectedBook}
        />

        <BookDetails
            selectedBook={selectedBook}
            onCloseDetails={() => setSelectedBook(null)} />
    </section>

}