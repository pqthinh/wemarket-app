import {
  GET_PRODUCT_TOP_REQUEST,
  GET_PRODUCT_TOP_SUCCESS,
  GET_PRODUCT_TOP_FAILED,
  GET_LIST_PRODUCT_REQUEST,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAILED,
  GET_PRODUCT_SUGGEST_REQUEST,
  GET_PRODUCT_SUGGEST_SUCCESS,
  GET_PRODUCT_SUGGEST_FAILED
} from '../actionTypes/homeActionTypes'

const listTopViewProduct = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_TOP_REQUEST:
      return {
        ...state,
        loading: true,
        listTopViewProduct: [],
        message: '',
        type: GET_PRODUCT_TOP_REQUEST
      }
    case GET_PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        listTopViewProduct: action.payload,
        message: '',
        type: GET_PRODUCT_TOP_SUCCESS
      }
    case GET_PRODUCT_TOP_FAILED:
      return {
        ...state,
        loading: false,
        listTopViewProduct: [],
        message: action.payload,
        type: GET_PRODUCT_TOP_FAILED
      }
    default:
      return state
  }
}

const listNewProduct = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUGGEST_REQUEST:
      return {
        ...state,
        loading: true,
        listNewProduct: [],
        message: '',
        type: GET_PRODUCT_SUGGEST_REQUEST
      }
    case GET_PRODUCT_SUGGEST_SUCCESS:
      return {
        ...state,
        loading: false,
        listNewProduct: action.payload,
        message: '',
        type: GET_PRODUCT_SUGGEST_SUCCESS
      }
    case GET_PRODUCT_SUGGEST_FAILED:
      return {
        ...state,
        loading: false,
        listNewProduct: [],
        message: action.payload,
        type: GET_PRODUCT_SUGGEST_FAILED
      }
    default:
      return state
  }
}

const listProduct = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        listProduct: {},
        message: '',
        type: GET_LIST_PRODUCT_REQUEST
      }
    case GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        listProduct: action.payload,
        message: '',
        type: GET_LIST_PRODUCT_SUCCESS
      }
    case GET_LIST_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        listProduct: {},
        message: action.payload,
        type: GET_LIST_PRODUCT_FAILED
      }
    default:
      return state
  }
}

export { listTopViewProduct, listProduct, listNewProduct }
