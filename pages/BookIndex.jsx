const { useState, useEffect } = React

import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'

export function BookIndex() {

    const [ books, setBooks ] = useState([])

    useEffect(() => {
        loadCars()
    }, [])


    function loadCars() {
        return bookService.query()
            .then(books => setBooks(books))
    }




    return <section className="book-index">
        {/* <CarFilter 
            filterBy={filterBy} 
            setFilterBy={setFilterBy} />  */}

        <BookList
            books={books} 
            // onRemoveCar={onRemoveCar} 
            // onSetSelectedCar={onSetSelectedCar}
            />

        {/* <CarDetails 
            selectedCar={selectedCar} 
            onCloseDetails={() => setSelectedCar(null)}/> */}
    </section>


}