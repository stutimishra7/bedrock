// import { configureStore } from '@reduxjs/toolkit'
// import { authReducer } from './reducers/authReducer'
// import { quizReducer } from './reducers/quizReducer'
// import { authStudentReducer } from './reducers/authStudentReducer'
// import { quizStudentReducer } from './reducers/quizStudentReducer'

// const store = configureStore({
//   reducer: {
//     authReducer,
//     quizReducer,
//     authStudentReducer: authStudentReducer.reducer,
//     quizStudentReducer: quizStudentReducer.reducer
//   }
// })

// export default store

import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
