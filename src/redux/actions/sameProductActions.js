import {
  FETCH_SAME_PRODUCT_REQUEST,
  FETCH_SAME_PRODUCT_SUCCESS,
  FETCH_SAME_PRODUCT_FAILED
} from '../actionTypes/sameProductActionType'
import { GET_LIST_SAME_PRODUCT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getSameProducts = uid => async dispatch => {
  try {
    dispatch({ type: FETCH_SAME_PRODUCT_REQUEST })
    const res = await axios.get(GET_LIST_SAME_PRODUCT(uid))
    if (res && res.data.status) {
      dispatch({ type: FETCH_SAME_PRODUCT_SUCCESS, payload: res.data.result })
    } else
      dispatch({ type: FETCH_SAME_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_SAME_PRODUCT_FAILED, payload: error })
  }
}
