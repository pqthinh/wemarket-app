import { GET_PRODUCT_DETAIL } from 'configs/api/apiPath'
import {
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED
} from '../actionTypes/productActionTypes'

export const getProductDetail =
  ({ data }) =>
  async dispatch => {
    try {
      const { idProduct } = params
      dispatch({ type: CREATE_PRODUCT_REQUEST })
      const res = await axios.post(GET_PRODUCT_DETAIL(idProduct))
      console.log(res, 'CREATE_PRODUCT_SUCCESS')
      if (res.status) dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: res })
      else
        dispatch({
          type: GET_DETAIL_PRODUCT_FAILED,
          payload: 'Có lỗi xuất hiện'
        })
    } catch (error) {
      dispatch({ type: CREATE_PRODUCT_FAILED, payload: message })
    }
  }

export const createProduct =
  ({ data }) =>
  async dispatch => {
    try {
      dispatch({ type: GET_DETAIL_PRODUCT_REQUEST })

      dispatch({ type: GET_DETAIL_PRODUCT_SUCCESS, payload: res })
    } catch (error) {
      dispatch({ type: GET_DETAIL_PRODUCT_FAILED, payload: message })
    }
  }
