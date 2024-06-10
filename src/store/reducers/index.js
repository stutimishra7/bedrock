/* Packs all the reducers into one root reducer */

/*
import xx from 'xx'
You can rename your reducer in combineReducers yy:xx
*/
import { combineReducers } from 'redux'
import { quizReducer } from './quizReducer'

const reducers = combineReducers({
  quizReducer,
})

export default reducers
