import { put, takeEvery } from 'redux-saga/effects';
import { Creators } from '../actions';
import {loginUser} from '../../api';
import {getUsersList} from '../../api';

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

function* testUserList(action) {
    try {
        let userListData = yield getUsersList();
        yield put(Creators.testUserSuccess(userListData))
    } catch (err) {
        yield put(Creators.testUserSuccess({}))
    }
}

export function* listUsers() {
    yield takeEvery('TEST_GET_USER', testUserList)
}

