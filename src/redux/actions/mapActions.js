import {
  FILTER_PRODUCT_REQUEST,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_FAILED
} from '../actionTypes/mapActionTypes'
import { FILTER_LIST_PRODUCT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getViewProductMap = params => async dispatch => {
  console.log(params)
  try {
    dispatch({ type: FILTER_PRODUCT_REQUEST })
    const res = await axios.post(FILTER_LIST_PRODUCT, params)
    if (res && res.data)
      dispatch({ type: FILTER_PRODUCT_SUCCESS, payload: res.data })
    else dispatch({ type: FILTER_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FILTER_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  }
}
