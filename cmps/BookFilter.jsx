const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, value, name: key } = target
        setFilterByToEdit(prev => ({ ...prev, [key]: type === 'number' ? +value : value }))
    }

    return <form className="car-filter">
        <input
            type="text"
            name="txt"
            placeholder="name"
            onChange={handleChange}
            value={filterByToEdit.txt} />

        <input
            type="number"
            name="price"
            placeholder="price"
            onChange={handleChange}
            value={filterByToEdit.price || ''} />
    </form>
}