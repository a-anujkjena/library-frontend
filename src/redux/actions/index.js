import { createActions } from 'reduxsauce';

const { Types, Creators } =  createActions({
    updateStatus: ['status'],
    testSagaRequest: ['user'],
    testLoginUser: ['userdata'],
    testReturnBook: ['bookid'],
    testBookCrud: ['bookrowdata'],
    testApiSuccess: ['result'],
    testSagaSuccess: ['bookData'],
    testLoginSuccess: ['userData'],
    testSagaFailure: []
})

export { Types, Creators }