const { useState } = React

export function AddReview({ bookId }) {

    const [review, setReview] = useState({ fullname: '', rating: '', readAt: '' })

    function handleChange({ target }) {
    }



    return <form action="">
        <label htmlFor="fullName">fullName</label>
        <input
            value={review.fullname}
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
    </form >
}