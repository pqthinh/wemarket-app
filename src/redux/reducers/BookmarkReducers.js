import {
  FETCH_BOOKMARK_REQUEST,
  FETCH_BOOKMARK_SUCCESS,
  FETCH_BOOKMARK_FAILED,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILED,
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_FAILED
} from '../actionTypes/bookmarkActionTypes'
// const INITIAL = {
//   loading: true,
//   listBOOKMARK: [],
//   error: {}
// }
const manageBookmarks = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BOOKMARK_REQUEST:
      return { ...state, loading: true }
    case FETCH_BOOKMARK_SUCCESS:
      return { ...state, loading: false, listBookmark: action.payload }
    case FETCH_BOOKMARK_FAILED:
      return { ...state, loading: false, error: action.payload }
    case CREATE_BOOKMARK_SUCCESS:
      return {
        ...state,
        listBookmark: state.listBookmark.filter(eachBookmark => {
          return eachBookmark.productId !== action.payload
        })
      }
    case CREATE_BOOKMARK_FAILED:
      return { ...state, error: action.payload }
    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        listBookmark: state.listBookmark.filter(eachBookmark => {
          return eachBookmark.productId !== action.payload
        })
      }
    case DELETE_BOOKMARK_FAILED:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
export { manageBookmarks }
