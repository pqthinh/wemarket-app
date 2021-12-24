import {
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED
} from '../actionTypes/productActionTypes'

const getProductDetails = (state = {}, action) => {
  switch (action.type) {
    case GET_DETAIL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
        message: '',
        type: GET_DETAIL_PRODUCT_REQUEST
      }
    case GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        message: '',
        type: GET_DETAIL_PRODUCT_SUCCESS
      }
    case GET_DETAIL_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        product: {},
        message: action.payload,
        type: GET_DETAIL_PRODUCT_FAILED
      }
    default:
      return state
  }
}

const createProduct = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        product: {},
        message: '',
        type: CREATE_PRODUCT_REQUEST
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        message: '',
        type: CREATE_PRODUCT_SUCCESS
      }
    case CREATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        product: {},
        message: action.payload,
        type: CREATE_PRODUCT_FAILED
      }
    default:
      return state
  }
}

export { getProductDetails, createProduct }
