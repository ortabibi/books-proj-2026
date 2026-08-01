const { useEffect, useRef, useState } = React
const { useParams } = ReactRouter
const { Link } = ReactRouterDOM

import { Loader } from '../cmps/Loader.jsx'
import { bookService } from '../services/book.service.js'
import { AddReview } from '../cmps/AddReview.jsx'

export function BookDetails() {
    const [book, setBook] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const { id: bookId } = useParams()

    const dialogRef = useRef()

    useEffect(() => {
        if (!dialogRef.current) return
        if (book) dialogRef.current.showModal()
        else dialogRef.current.close()
    }, [book])

    useEffect(() => {
        setIsLoading(true)

        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [bookId])

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    function getPublishedText(publishedDate) {
        const currentYear = new Date().getFullYear()
        const yearsAgo = currentYear - publishedDate

        if (yearsAgo > 10) return 'Vintage'
        if (yearsAgo < 1) return 'New'
        return ''
    }

    if (!book || isLoading) return <Loader />


    return <dialog ref={dialogRef} closedby="any" className="book-details">
        <img src={book.thumbnail} alt="" />
        <h2>{book.title}</h2>

        <p className={getPriceClass(book.listPrice.amount)}
        >{book.listPrice.amount}
        </p>

        <p> publishedDate: {book.publishedDate}</p>

        <p>pageCount: {book.pageCount}</p>

        < AddReview bookId ={book.id} />

        <Link to="/book"><button>x</button></Link>
    </dialog>
}