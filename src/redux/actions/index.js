import { createActions } from 'reduxsauce';

const { Types, Creators } =  createActions({
    updateStatus: ['status'],
    testSagaRequest: ['user'],
    testSagaSuccess: ['bookData'],
    testSagaFailure: []
})

export { Types, Creators }