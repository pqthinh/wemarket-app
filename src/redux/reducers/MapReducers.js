import {
  FILTER_PRODUCT_REQUEST,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_FAILED
} from '../actionTypes/mapActionTypes'

const listProductMapFilter = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        listViewProductMap: {},
        message: '',
        type: FILTER_PRODUCT_REQUEST
      }
    case FILTER_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        listViewProductMap: action.payload,
        message: '',
        type: FILTER_PRODUCT_SUCCESS
      }
    case FILTER_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        listViewProductMap: {},
        message: action.payload,
        type: FILTER_PRODUCT_FAILED
      }
    default:
      return state
  }
}

export { listProductMapFilter }
