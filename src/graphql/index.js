const book = `{
    id
    Title
    Author
    Year
    Date_of_Issue
    Date_Of_Return
    Member_Id
}`

const listBooks = `
    query listBooks {
        listBooks {
            items ${book}
        }
    }
`

const listBooksUsingId = `
    query listBooks($filterData: TableBookFilterInput) {
        listBooks(filter:$filterData) {
            items ${book}
        }
    }
`

const addBook = `
    mutation createBook($createbookinput: CreateBookInput!) {
        createBook(input: $createbookinput) ${book}
  }
`

const updateBook = `
    mutation updateBook($updatebookinput: UpdateBookInput!) {
        updateBook(input: $updatebookinput) ${book}
  }
`

const deleteBook = `
    mutation deleteBook($deletebookinput: DeleteBookInput!) {
        deleteBook(input: $deletebookinput) ${book}
  }
`

export default {
    listBooks,
    addBook,
    updateBook,
    deleteBook,
    listBooksUsingId
}