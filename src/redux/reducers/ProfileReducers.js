import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  UPDATE_AVATAR_SUCCESS
} from '../actionTypes/profileActionType'

const manageProfile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return { ...state, loading: true }
    case FETCH_POST_SUCCESS:
      return { ...state, loading: false, listPost: action.payload }
    case FETCH_POST_FAILED:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_AVATAR_SUCCESS:
      return { ...state, uri: action.payload }
    case UPDATE_AVATAR_SUCCESS:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
export { manageProfile }
