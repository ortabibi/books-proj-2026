const { useEffect, useRef } = React

export function BookDetails({ selectedBook, onCloseDetails }) {

    const dialogRef = useRef()

    useEffect(() => {
        if (selectedBook) dialogRef.current.showModal()
        else dialogRef.current.close()
    }, [selectedBook])


    return <dialog onClose={onCloseDetails} ref={dialogRef} closedby="any" className="book-details">
        <img src={selectedBook && selectedBook.thumbnail} alt="" />
        <h2>{selectedBook && selectedBook}</h2>
        <p>{selectedBook && selectedBook}</p>
        <p>{selectedBook && selectedBook}</p>

        <button onClick={onCloseDetails}>x</button>
    </dialog>

}