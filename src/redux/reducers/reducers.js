import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Types } from '../actions'

export const InitialState = Immutable({
    status: {},
    bookData: [],
    userData: {},
    apiResult: {}
})

const updateStatus = (state, action) => {
    return Immutable.merge(state, action.status)
}

const bookData = (state, action) => {
    return {
        ...state,
        bookData: action.bookData
    }
}

const userData = (state, action) => {
    return {
        ...state,
        userData: action.userData
    }
}

const apiResult = (state, action) => {
    return {
        ...state,
        apiResult: action.result
    }
}

export const handlers= {
    [Types.TEST_SAGA_SUCCESS]: bookData,
    [Types.TEST_API_SUCCESS]: apiResult,
    [Types.TEST_LOGIN_SUCCESS]: userData,
    [Types.UPDATE_STATUS]: updateStatus
}

export default createReducer(InitialState, handlers)