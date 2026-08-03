const { useState, useEffect } = React

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview())

    const navigate = useNavigate()
    const { id: bookId } = useParams()


    function handleChange({ target }) {
        const { value, type, name } = target
        setReview(prev => ({ ...prev, [name]: type === 'number' ? +value : value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.saveReview(bookId, review)
            .then(review => {
                showSuccessMsg('review saved')
                navigate(`/book/${bookId}`)
            })
    }

    return <form onSubmit={onSaveBook} className='add-review'>
        <label htmlFor="fullName">fullName</label>
        <input
            value={review.fullName}
            onChange={handleChange}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="fullName"
        />

        <label htmlFor="rating">rating</label>
        <select
            value={review.rating}
            onChange={handleChange}
            id="rating"
            name="rating">
            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label htmlFor="fullName">readAt</label>
        <input
            value={review.readAt}
            onChange={handleChange}
            id="readAt"
            name="readAt"
            type="date"
            placeholder="readAt"
        />

        <div>
            <button>Save</button>
            <Link to={`/book/${bookId}`}><button type="button" >Cancel</button></Link>
        </div>

    </form >


}