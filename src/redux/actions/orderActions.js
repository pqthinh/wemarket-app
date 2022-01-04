import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED
} from '../actionTypes/orderActionType'
import { GET_LIST_ORDER_BY_BUYER, DELETE_ORDER } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getOrderBuyer = params => async dispatch => {
  try {
    dispatch({ type: FETCH_ORDER_REQUEST })
    const res = await axios.post(GET_LIST_ORDER_BY_BUYER, params)

    if (res && res.data) {
      dispatch({ type: FETCH_ORDER_SUCCESS, payload: res.data.result })
    } else dispatch({ type: FETCH_ORDER_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_ORDER_FAILED, payload: error })
  }
}
export const deleteOrder = params => async dispatch => {
  try {
    const res = await axios.post(DELETE_ORDER, { params })
    console.log(res, 'res')
    if (res && res.data.status) {
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: params.idOrder })
    } else dispatch({ type: DELETE_ORDER_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILED, payload: error })
  }
}
