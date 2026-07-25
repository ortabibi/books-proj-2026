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

    function getPageCount(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount < 500 && pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
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
        >price: {selectedBook && selectedBook.listPrice.amount}
        </p>

        <p> publishedDate: {selectedBook && selectedBook.publishedDate}{' '}
            {selectedBook ? getPublishedText(selectedBook.publishedDate) : ''}
        </p>

        <p>pageCount: {selectedBook && selectedBook.pageCount}
            {' '} {selectedBook ? getPageCount(selectedBook.pageCount) : ''}
        </p>

        <button onClick={onCloseDetails}>x</button>
    </dialog>

}