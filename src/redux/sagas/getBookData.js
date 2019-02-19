import { put, takeEvery } from 'redux-saga/effects';
import { Creators } from '../actions';
import { getBookData } from '../../api';

function* testSagaRequest(action) {
    try {
        let bookData = yield getBookData(action.user)
        yield put(Creators.testSagaSuccess(bookData))
    } catch (err) {
        yield put(Creators.testSagaFailure("Data Not Found"))
    }
}

export function* getBook() {
    yield takeEvery('TEST_SAGA_REQUEST', testSagaRequest)
}