const { useEffect, useRef } = React

export function BookDetails({ selectedBook, onCloseDetails }) {

    const dialogRef = useRef()

    useEffect(() => {
        if (selectedBook) dialogRef.current.showModal()
        else dialogRef.current.close()
    }, [selectedBook])

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    return <dialog onClose={onCloseDetails} ref={dialogRef} closedby="any" className="book-details">
        <img src={selectedBook && selectedBook.thumbnail} alt="" />
        <h2>{selectedBook && selectedBook.title}</h2>
        <p className={selectedBook ? getPriceClass(selectedBook.listPrice.amount) : ''}
        >{selectedBook && selectedBook.listPrice.amount}
        </p>
        <p>{selectedBook && selectedBook.publishedDate}</p>
        <p>{selectedBook && selectedBook.pageCount}</p>

        <button onClick={onCloseDetails}>x</button>
    </dialog>

}