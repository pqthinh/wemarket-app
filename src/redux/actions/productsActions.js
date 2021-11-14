import {
  GET_DETAIL_PRODUCT_REQUEST,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED
} from '../actionTypes/productActionTypes'

export const getProductDetail =
  ({ data }) =>
  async dispatch => {
    try {
      const { idProduct } = params

      dispatch({ type: GET_DETAIL_PRODUCT_REQUEST })

      dispatch({ type: GET_DETAIL_PRODUCT_SUCCESS, payload: res })
    } catch (error) {
      dispatch({ type: GET_DETAIL_PRODUCT_FAILED, payload: message })
    }
  }
