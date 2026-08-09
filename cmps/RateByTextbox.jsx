export function RateByTextbox({ val, onSetRating }) {

    function handleChange({ target }) {
        onSetRating(+target.value)
    }

    return <input
        value={val}
        onChange={handleChange}
        id="rating"
        name="rating"
        type="text"
        placeholder="rating"
    />
}