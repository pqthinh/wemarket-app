import {
  GET_PRODUCT_TOP_REQUEST,
  GET_PRODUCT_TOP_SUCCESS,
  GET_PRODUCT_TOP_FAILED,
  GET_LIST_PRODUCT_REQUEST,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAILED
} from '../actionTypes/homeActionTypes'
import { GET_LIST_PRODUCT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getTopViewProduct = params => async dispatch => {
  try {
    dispatch({ type: GET_PRODUCT_TOP_REQUEST })
    const res = await axios.get(GET_LIST_PRODUCT, { params })
    if (res && res.data)
      dispatch({ type: GET_PRODUCT_TOP_SUCCESS, payload: res.data })
    else dispatch({ type: GET_PRODUCT_TOP_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: GET_PRODUCT_TOP_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}

export const getListProduct = params => async dispatch => {
  try {
    dispatch({ type: GET_LIST_PRODUCT_REQUEST })
    const res = await axios.get(GET_LIST_PRODUCT, { params })

    if (res && res.data && res.data.result)
      dispatch({ type: GET_LIST_PRODUCT_SUCCESS, payload: res.data })
    else
      dispatch({ type: GET_LIST_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: GET_LIST_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}
