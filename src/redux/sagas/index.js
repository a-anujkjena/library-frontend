import { getBook } from './getBookData';
import { returnBooks } from './getBookData';
import { bookOperation } from './getBookData';
import { statusSaga } from './statusSaga';
import { loginUsers } from './validateUser';
import { listUsers } from './validateUser';

export default [
    getBook,
    returnBooks,
    bookOperation,
    loginUsers,
    listUsers,
    statusSaga
]