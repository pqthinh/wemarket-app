import { CREATE_PRODUCT, GET_PRODUCT_DETAIL } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import {
  CREATE_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS
} from '../actionTypes/productActionTypes'

export const getProductDetail = params => async dispatch => {
  try {
    const { idProduct } = params
    dispatch({ type: GET_DETAIL_PRODUCT_REQUEST })
    const res = await axios.post(GET_PRODUCT_DETAIL(idProduct))
    if (res.status) dispatch({ type: GET_DETAIL_PRODUCT_SUCCESS, payload: res })
    else
      dispatch({
        type: GET_DETAIL_PRODUCT_FAILED,
        payload: 'Có lỗi xuất hiện'
      })
  } catch (error) {
    dispatch({ type: GET_DETAIL_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}

export const createProduct = data => async dispatch => {
  console.log(data)
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const res = await axios.post(CREATE_PRODUCT, data)
    console.log(res, 'res')
    if (res.status)
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res.data })
    else dispatch({ type: CREATE_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    console.log(error)
    dispatch({ type: CREATE_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}
