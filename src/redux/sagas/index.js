import { getBook } from './getBookData';
import { statusSaga } from './statusSaga';
import { loginUsers } from './validateUser';

export default [
    getBook,
    loginUsers,
    statusSaga
]