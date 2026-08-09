import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getEmptyReview,
    saveReview,
    deleteReview,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(car => _setNextPrevBookId(car))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function saveReview(bookId, review) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            review.id = utilService.makeId()
            book.reviews.push(review)
            return storageService.put(BOOK_KEY, book)
        })
}



function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    if (!books || !books.length) {

        books = []
        for (let i = 0; i < 2; i++) {
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
                },
                reviews: _createDemoReviews()
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)

    }
    console.log('books', books)
}



function getEmptyBook(title = '', amount = 0) {
    return {
        title,
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: false
        }
    }
}

function getDefaultFilter(filterBy = { txt: '', price: 0 }) {
    return { txt: filterBy.txt, price: filterBy.price }
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currCar) => currCar.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _createDemoReviews() {
    const reviews = []

    const REVIEWER_NAMES = [
        'John Smith',
        'Emma Johnson',
        'Michael Brown',
        'Sarah Davis',
        'David Wilson',
        'Emily Taylor',
        'James Anderson',
        'Olivia Martinez',
        'Daniel Thomas',
        'Sophia Garcia'
    ]

    for (let i = 0; i < 3; i++) {
        const year = utilService.getRandomIntInclusive(2015, 2024)
        const month = utilService.getRandomIntInclusive(1, 12)
        const day = utilService.getRandomIntInclusive(1, 28)

        const review = {
            id: utilService.makeId(),
            fullName: REVIEWER_NAMES[utilService.getRandomIntInclusive(0, 9)],
            rating: utilService.getRandomIntInclusive(1, 5),
            readAt: `${year}-${utilService.padNum(month)}-${utilService.padNum(day)}`
        }
        reviews.push(review)
    }
    return reviews
}

function getEmptyReview(fullName = '', rating = '', readAt = '') {
    return { fullName, rating, readAt }
}

function deleteReview(bookId, reviewId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book.reviews = book.reviews.filter(review => review.id !== reviewId)
            return storageService.put(BOOK_KEY, book)
        })
}