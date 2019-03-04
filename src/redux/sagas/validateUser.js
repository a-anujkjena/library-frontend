import { put, takeEvery } from 'redux-saga/effects';
import { Creators } from '../actions';
import {loginUser} from '../../api';

function* testLoginUser(action) {
    try {
        let userData = yield loginUser(action.userdata);
        yield put(Creators.testLoginSuccess(userData))
    } catch (err) {
        yield put(Creators.testLoginSuccess({}))
    }
}

export function* loginUsers() {
    yield takeEvery('TEST_LOGIN_USER', testLoginUser)
}