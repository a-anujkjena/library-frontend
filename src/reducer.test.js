import testReducers from './redux/reducers/reducers'
import { Creators } from './redux/actions';

describe('>>>R E D U C E R --- Test API Response',()=>{
    it('+++ reducer for ADD_INPUT', () => {
        let state = testReducers({},{type:"TEST_API_SUCCESS",result: {"Status":"Success"}});
        //console.log("State 1",state)
        expect(state).toEqual({ apiResult: { Status: 'Success' } })
        //expect(state).toEqual({output:500})
    });
});

describe('>>>R E D U C E R --- Test User List',()=>{
    it('+++ reducer for ADD_INPUT', () => {
        let state = testReducers({},{type:"TEST_USER_SUCCESS",userListData: [{"id":1,"Name":"Test User"}]});
        //console.log("State 2",state)
        expect(state).toEqual({ userListData: [ { id: 1, Name: 'Test User' } ] })
        //expect(state).toEqual({output:500})
    });
});

describe('>>>R E D U C E R --- Test Book List',()=>{
    it('+++ reducer for ADD_INPUT', () => {
        let state = testReducers({},{type:"TEST_SAGA_SUCCESS",bookData: [{"id":1,"Name":"Book Data"}]});
        //console.log("State 3",state)
        expect(state).toEqual({bookData: [{"id":1,"Name":"Book Data"}]})
        //expect(state).toEqual({output:500})
    });
});

describe('>>>R E D U C E R --- Test Login Test',()=>{
    it('+++ reducer for ADD_INPUT', () => {
        let state = testReducers({},{type:"TEST_LOGIN_SUCCESS",userData: [{"id":1,"Name":"Test User"}]});
        //console.log("State 4",state)
        expect(state).toEqual({ userData: [{"id":1,"Name":"Test User"}]})
        //expect(state).toEqual({output:500})
    });
});
