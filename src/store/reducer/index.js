import {combineReducers} from 'redux'
import exerciseReducer from './exercise'

const rootReducer = combineReducers({
    exercises : exerciseReducer
    
})

export default rootReducer;
