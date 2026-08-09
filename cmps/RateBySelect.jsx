export function RateBySelect({ val, onSetRating }) {
    
    function handleChange({ target }) {
        onSetRating(+target.value)
    }
    
    return <select value={val} onChange={handleChange}>
        <option value="">Select rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
}