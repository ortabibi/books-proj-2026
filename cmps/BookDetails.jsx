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

    function getPublishedText(publishedDate) {
        const currentYear = new Date().getFullYear()
        const yearsAgo = currentYear - publishedDate

        if (yearsAgo > 10) return 'Vintage'
        if (yearsAgo < 1) return 'New'
        return ''
    }

    return <dialog onClose={onCloseDetails} ref={dialogRef} closedby="any" className="book-details">
        <img src={selectedBook && selectedBook.thumbnail} alt="" />
        <h2>{selectedBook && selectedBook.title}</h2>

        <p className={selectedBook ? getPriceClass(selectedBook.listPrice.amount) : ''}
        >{selectedBook && selectedBook.listPrice.amount}
        </p>
        
        <p> publishedDate: {selectedBook && selectedBook.publishedDate}{' '}
              {selectedBook ? getPublishedText(selectedBook.publishedDate) : ''}</p>
        <p>{selectedBook && selectedBook.pageCount}</p>

        <button onClick={onCloseDetails}>x</button>
    </dialog>

}