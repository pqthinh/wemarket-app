import {
  CREATE_PRODUCT,
  GET_PRODUCT_DETAIL,
  GET_COMMENT,
  SEARCH_PRODUCT
} from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import { withArray, withBoolean, withObject } from 'exp-value'
import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_COMMENT_FAILED,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  SEARCH_FAILED,
  SEARCH_REQUEST,
  SEARCH_SUCCESS
} from '../actionTypes/productActionTypes'

export const getProductDetail = params => async dispatch => {
  try {
    dispatch({ type: GET_DETAIL_PRODUCT_REQUEST })
    const res = await axios.post(GET_PRODUCT_DETAIL, params)
    if (withBoolean('data.status', res))
      dispatch({
        type: GET_DETAIL_PRODUCT_SUCCESS,
        payload: withObject('data.result', res)
      })
    else
      dispatch({
        type: GET_DETAIL_PRODUCT_FAILED,
        payload: 'Có lỗi xuất hiện'
      })
  } catch (error) {
    dispatch({ type: GET_DETAIL_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}

export const getListComment = data => async dispatch => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST })
    const res = await axios.post(GET_COMMENT, data)
    if (res.status)
      dispatch({ type: GET_COMMENT_SUCCESS, payload: res.data.result })
    else dispatch({ type: GET_COMMENT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: GET_COMMENT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}

export const createProduct = data => async dispatch => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const res = await axios.post(CREATE_PRODUCT, data)
    if (res.status)
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data })
    else dispatch({ type: CREATE_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: CREATE_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}

export const addToBookmark = id => async dispatch => {
  dispatch({ type: 'ADD_TO_BOOKMARK', payload: id })
}

export const searchProduct = params => async dispatch => {
  try {
    dispatch({ type: SEARCH_REQUEST })
    const res = await axios.post(SEARCH_PRODUCT, params)
    if (res.status)
      dispatch({
        type: SEARCH_SUCCESS,
        payload: withArray('data.products.result', res)
      })
    else dispatch({ type: SEARCH_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: SEARCH_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}
