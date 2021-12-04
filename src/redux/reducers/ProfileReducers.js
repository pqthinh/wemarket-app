import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_USER_SUCCESS
} from '../actionTypes/profileActionType'

const INITIAL = {
  currentUser: null,
  error: null,
  uri: null
}

const manageProfile = (state = INITIAL, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.currentUser }
    case FETCH_USER_ERROR:
      return { ...state, error: action.error }
    case UPDATE_USER_SUCCESS:
      return { ...state, uri: action.uri }

    default:
      return state
  }
}
export { manageProfile }
