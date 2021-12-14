import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  UPDATE_USER_SUCCESS
} from '../actionTypes/profileActionType'

const INITIAL = {
  loading: true,
  listPost: {},
  error: {},
  uri: null
}

const manageProfile = (state = INITIAL, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return { ...INITIAL, loading: true }
    case FETCH_POST_SUCCESS:
      return { ...INITIAL, loading: false, listPost: action.payload }
    case FETCH_POST_FAILED:
      return { ...INITIAL, loading: false, error: action.payload }
    case UPDATE_USER_SUCCESS:
      return { ...INITIAL, uri: action.uri }

    default:
      return state
  }
}
export { manageProfile }
