const { useState } = React

export function RateByStars({ val, onSelected }) {
    const [hover, setHover] = useState(0)

    return <div className="star-rating">
        {[...Array(5)].map((_, index) => {
            index += 1
            return <button
                type="button"
                key={index}
                className={index <= (hover || val) ? 'on' : 'off'}
                onClick={() => onSelected(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}>
                <span className="star"><i className="fa-solid fa-star fa-lg"></i></span>
            </button>
        })}
    </div>
}