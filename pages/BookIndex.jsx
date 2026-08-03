const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBooks()
    }, [filterBy])


    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }

    function onRemoveBook(bookId) {
        // Remove data from storage
        // Only then from state

        bookService.remove(bookId)
            .then(() => {
                setBooks(prev => prev.filter(book => book.id !== bookId))
                showSuccessMsg(`book ${bookId} deleted`)
            })
            .catch(err => {
                showErrorMsg(`Couldn't delete book ${bookId}`)
            })
    }



    return <section className="book-index">
        <BookFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
        />
        <Link to="/book/edit"><button>+</button></Link>

        <BookList
            books={books}
            onRemoveBook={onRemoveBook}
        />
    </section>

}