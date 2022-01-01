import {
  FETCH_SAME_PRODUCT_REQUEST,
  FETCH_SAME_PRODUCT_SUCCESS,
  FETCH_SAME_PRODUCT_FAILED
} from '../actionTypes/sameProductActionType'

const fetchSameProduct = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SAME_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case FETCH_SAME_PRODUCT_SUCCESS:
      return { ...state, loading: false, listSameProduct: action.payload }
    case FETCH_SAME_PRODUCT_FAILED:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export { fetchSameProduct }
