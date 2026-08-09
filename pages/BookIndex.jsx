const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import { utilService } from '../services/util.service.js'

export function BookIndex() {
    const [books, setBooks] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        loadBooks(filterBy)
    }, [])

    useEffectUpdate(() => {
        loadBooks(filterBy)
        setSearchParams(utilService.trimObj(filterBy))
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