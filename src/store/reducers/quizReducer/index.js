import { actionTypes } from '../../actionTypes'

const initialState = {
  subQues: 5,
  objQues: 5,
  urls: [],
  quizId: '',
  quizName: '',
  questions: [],
  settings: {},
  createdQuiz: {},
  quizTopics: [],
  totalScore: 0
}

export const quizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.UPLOAD_FILE:
      return { ...state, urls: [...state.urls, payload.url] }
    case actionTypes.DELETE_FILE:
      return { ...state, urls: state.urls.filter(url => url !== payload.url) }
    default:
      return state
  }
}
