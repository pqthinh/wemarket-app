import {
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED,
  GET_COMMENT_FAILED,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  SEARCH_FAILED,
  SEARCH_REQUEST,
  SEARCH_SUCCESS
} from '../actionTypes/productActionTypes'

const productDetail = (state = {}, action) => {
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
    case GET_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        type: GET_COMMENT_REQUEST
      }
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        listComment: action.payload,
        type: GET_COMMENT_SUCCESS
      }
    case GET_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        listComment: [],
        type: GET_COMMENT_FAILED
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

const listBookmark = (state = { bookmark: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_BOOKMARK':
      return {
        ...state,
        bookmark:
          state.bookmark.filter(p => p == action.payload).length > 0
            ? state.bookmark.filter(p => p != action.payload)
            : [...state.bookmark, action.payload]
      }
    default:
      return state
  }
}

const resSearchProduct = (state = { products: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
        message: '',
        type: SEARCH_REQUEST
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        message: '',
        type: SEARCH_SUCCESS
      }
    case SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        products: [],
        message: action.payload,
        type: SEARCH_FAILED
      }
    default:
      return state
  }
}
export { productDetail, createProduct, listBookmark, resSearchProduct }
