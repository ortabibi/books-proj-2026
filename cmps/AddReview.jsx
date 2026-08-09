const { useState, useEffect } = React

const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

import { RateBySelect } from "./RateBySelect.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"
import { RateByStars } from "./RateByStars.jsx"

export function AddReview() {
    const [review, setReview] = useState(bookService.getEmptyReview())
    const [cmpType, setCmpType] = useState('RateBySelect')
    const [rating, setRating] = useState({})



    const navigate = useNavigate()
    const { id: bookId } = useParams()


    function handleChange({ target }) {
        const { value, type, name } = target
        setReview(prev => ({ ...prev, [name]: type === 'number' ? +value : value }))
    }

    function handleChangeRating({ target }) {
        setCmpType(target.value)
    }

    function onSetRating(rating) {
        setReview(prev => ({ ...prev, rating }))
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
        <div className='rating-group'>
            <select onChange={handleChangeRating}>
                <option>RateBySelect</option>
                <option>RateByTextbox</option>
                <option>RateByStars</option>
            </select>

            <DynamicCmp cmpType={cmpType} val={review.rating} onSelected={onSetRating} />
        </div>


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

function DynamicCmp(props) {
    const cmpMap = {
        RateBySelect: <RateBySelect {...props} />,
        RateByTextbox: <RateByTextbox {...props} />,
        RateByStars: <RateByStars {...props} />,
    }

    return cmpMap[props.cmpType]
}