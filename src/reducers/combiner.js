
import { combineReducers } from 'redux'
// REDUCERS
import foodReducer from './foodReducer'


const allReducers = combineReducers({
  food:foodReducer,
})

export default allReducers