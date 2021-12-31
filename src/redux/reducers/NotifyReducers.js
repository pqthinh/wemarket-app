import {
  FETCH_NOTIFY_REQUEST,
  FETCH_NOTIFY_SUCCESS,
  FETCH_NOTIFY_FAILED,
  DELETE_NOTIFY_SUCCESS,
  DELETE_NOTIFY_FAILED,
  UPDATE_NOTIFY_SUCCESS,
  UPDATE_NOTIFY_FAILED
} from '../actionTypes/notifyActionTypes'

const manageNotifies = (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTIFY_REQUEST:
      return { ...state, loading: true }
    case FETCH_NOTIFY_SUCCESS:
      return { ...state, loading: false, listNotify: action.payload }
    case FETCH_NOTIFY_FAILED:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_NOTIFY_SUCCESS:
      return {
        ...state,
        listNotify: state.listNotify.map(eachNotify =>
          eachNotify.id === action.payload
            ? { ...eachNotify, isRead: 1 }
            : eachNotify
        )
      }
    case UPDATE_NOTIFY_FAILED:
      return { ...state, error: action.payload }
    case DELETE_NOTIFY_SUCCESS:
      return {
        ...state,
        listNotify: state.listNotify.filter(eachNotify => {
          return eachNotify.id !== action.payload
        })
      }
    case DELETE_NOTIFY_FAILED:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
export { manageNotifies }
