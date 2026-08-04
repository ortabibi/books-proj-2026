const { useState, useEffect } = React

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())

    const navigate = useNavigate()
    const { id: bookId } = useParams()

    useEffect(() => {
        if (!bookId) return

        bookService.get(bookId)
            .then(setBook)
    }, [])

function handleChange({ target }) {
    const { value, name, type } = target
    const val = type === 'number' ? +value : value

    if (name.includes('.')) {
        const [outerKey, innerKey] = name.split('.')
        setBook(prev => ({
            ...prev,
            [outerKey]: { ...prev[outerKey], [innerKey]: val }
        }))
    } else {
        setBook(prev => ({ ...prev, [name]: val }))
    }
}

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(car => {
                showSuccessMsg('book saved')
                navigate('/book')
            })
    }

    return <form onSubmit={onSaveBook} className="book-edit">
        <label htmlFor="name">name</label>
        <input
            value={book.title}
            onChange={handleChange}
            id="name"
            name="title"
            type="text"
            placeholder="name" />

        <label htmlFor="price">price</label>
        <input
            value={book.listPrice.amount || ''}
            onChange={handleChange}
            id="price"
            name="listPrice.amount"
            type="number"
            placeholder="price" />

        <div>
            <button>Save</button>
            <Link to="/book"><button type="button" >Cancel</button></Link>
        </div>

    </form>
}