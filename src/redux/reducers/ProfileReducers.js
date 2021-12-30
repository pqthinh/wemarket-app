import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  RESET_POST
} from '../actionTypes/profileActionType'

const manageProfile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return { ...state, loading: true }
    case FETCH_POST_SUCCESS:
      return { ...state, loading: false, listPost: action.payload }
    case FETCH_POST_FAILED:
      return { ...state, loading: false, error: action.payload }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        listPost: state.listPost.filter(eachProduct => {
          return eachProduct.id != action.payload
        })
      }
    case DELETE_PRODUCT_FAILED:
      return { ...state, error: action.payload }

    default:
      return state
  }
}
export { manageProfile }
