import { createActions } from 'reduxsauce';

const { Types, Creators } =  createActions({
    updateStatus: ['status'],
    testSagaRequest: ['user'],
    testLoginUser: ['userdata'],
    testSagaSuccess: ['bookData'],
    testLoginSuccess: ['userData'],
    testSagaFailure: []
})

export { Types, Creators }