import { actionTypes } from '../../actionTypes'


export const uploadFile = (payload) => {
  return {
    type: actionTypes.UPLOAD_FILE,
    payload: payload
  }
}

export const deleteFile = (payload) => {
  return {
    type: actionTypes.DELETE_FILE,
    payload: payload
  }
}
