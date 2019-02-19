import { getBook } from './getBookData';
import { statusSaga } from './statusSaga';

export default [
    getBook,
    statusSaga
]