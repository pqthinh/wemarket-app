import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED
} from '../actionTypes/orderActionType'

const manageOrder = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return { ...state, loading: true }
    case FETCH_ORDER_SUCCESS:
      return { ...state, loading: false, listOrder: action.payload }
    case FETCH_ORDER_FAILED:
      return { ...state, loading: false, error: action.payload }
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        listOrder: state.listOrder.reverse().filter(eachProduct => {
          return eachProduct.id != action.payload
        })
      }
    case DELETE_ORDER_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
export { manageOrder }
