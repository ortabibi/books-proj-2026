import { utilService} from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.minSpeed) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
        .then(car => {
            car = _setNextPrevCarId(car)
            return car
        })
}

function remove(carId) {
    return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}



function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    if (!books || !books.length) {

        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)

    }
    console.log('books', books)
}



function getEmptyCar(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}


function getDefaultFilter(filterBy = { txt: '', price: 0 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}
