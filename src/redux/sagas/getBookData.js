import { put, takeEvery } from 'redux-saga/effects';
import { Creators } from '../actions';
import {getBookData} from '../../api';
import {returnBook} from '../../api';
import {bookCrud} from '../../api';

function* testSagaRequest(action) {
    try {
        let bookData = yield getBookData(action.user);
        yield put(Creators.testSagaSuccess(bookData))
    } catch (err) {
        yield put(Creators.testSagaFailure("Data Not Found"))
    }
}

export function* getBook() {
    yield takeEvery('TEST_SAGA_REQUEST', testSagaRequest)
}

function* testReturnBook(action) {
    try {
        let returnResult = yield returnBook(action.bookid);
        yield put(Creators.testApiSuccess(returnResult))
    } catch (err) {
        yield put(Creators.testApiSuccess({}))
    }
}

export function* returnBooks() {
    yield takeEvery('TEST_RETURN_BOOK', testReturnBook)
}

function* testBookCrud(action) {
    try {
        let returnResult = yield bookCrud(action.bookrowdata);
        yield put(Creators.testApiSuccess(returnResult))
    } catch (err) {
        yield put(Creators.testApiSuccess({}))
    }
}

export function* bookOperation() {
    yield takeEvery('TEST_BOOK_CRUD', testBookCrud)
}
