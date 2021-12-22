import {
  FETCH_SEEN_RECENT_REQUEST,
  FETCH_SEEN_RECENT_SUCCESS,
  FETCH_SEEN_RECENT_FAILED
} from '../actionTypes/seenRecentActionTypes'

const listProductSeenRecent = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SEEN_RECENT_REQUEST:
      return { ...state, loading: true }
    case FETCH_SEEN_RECENT_SUCCESS:
      return { ...state, loading: false, listSeenRecent: action.payload }
    case FETCH_SEEN_RECENT_FAILED:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export { listProductSeenRecent }
