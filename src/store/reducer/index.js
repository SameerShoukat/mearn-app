import {combineReducers} from 'redux'
import exerciseReducer from './exercise'
import user from './user';

const rootReducer = combineReducers({
    exercises : exerciseReducer,
    user : user
    
})

export default rootReducer;
