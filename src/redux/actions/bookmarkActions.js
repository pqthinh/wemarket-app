import { firebase } from 'configs/firebaseConfig'
import {
  FETCH_BOOKMARK_REQUEST,
  FETCH_BOOKMARK_SUCCESS,
  FETCH_BOOKMARK_FAILED,
  DELETE_BOOKMARK_SUCCESS,
  DELETE_BOOKMARK_FAILED,
  CREATE_BOOKMARK_SUCCESS,
  CREATE_BOOKMARK_FAILED
} from '../actionTypes/bookmarkActionTypes'
import {
  GET_LIST_BOOKMARK,
  CREATE_BOOKMARK,
  DELETE_BOOKMARK
} from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getBookmarks = uid => async dispatch => {
  try {
    dispatch({ type: FETCH_BOOKMARK_REQUEST })
    const res = await axios.get(GET_LIST_BOOKMARK(uid))
    if (res && res.data) {
      dispatch({ type: FETCH_BOOKMARK_SUCCESS, payload: res.data.data })
    } else
      dispatch({ type: FETCH_BOOKMARK_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_BOOKMARK_FAILED, payload: error })
  }
}
export const creteBookmark = params => async dispatch => {
  try {
    const res = await axios.post(CREATE_BOOKMARK, params)
    if (res && res.data.status) {
      dispatch({ type: CREATE_BOOKMARK_SUCCESS, payload: params.productId })
    } else
      dispatch({ type: CREATE_BOOKMARK_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: CREATE_BOOKMARK_FAILED, payload: error })
  }
}
export const deleteBookmark = params => async dispatch => {
  console.log(params)
  try {
    const res = await axios.post(DELETE_BOOKMARK, params)

    if (res && res.data.status) {
      dispatch({ type: DELETE_BOOKMARK_SUCCESS, payload: params.productId })
    } else
      dispatch({ type: DELETE_BOOKMARK_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: DELETE_BOOKMARK_FAILED, payload: error })
  }
}
