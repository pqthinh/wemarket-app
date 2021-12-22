import { firebase } from 'configs/firebaseConfig'
import {
  FETCH_NOTIFY_REQUEST,
  FETCH_NOTIFY_SUCCESS,
  FETCH_NOTIFY_FAILED,
  DELETE_NOTIFY_SUCCESS,
  DELETE_NOTIFY_FAILED,
  UPDATE_NOTIFY_SUCCESS,
  UPDATE_NOTIFY_FAILED
} from '../actionTypes/notifyActionTypes'
import {
  GET_LIST_NOTIFY,
  UPDATE_LIST_NOTIFY,
  DELETE_NOTIFY_USER
} from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getNotifies = uid => async dispatch => {
  try {
    dispatch({ type: FETCH_NOTIFY_REQUEST })
    const res = await axios.get(GET_LIST_NOTIFY(uid))
    if (res && res.data) {
      dispatch({ type: FETCH_NOTIFY_SUCCESS, payload: res.data.data })
    } else dispatch({ type: FETCH_NOTIFY_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_NOTIFY_FAILED, payload: error })
  }
}
export const updateNotify = params => async dispatch => {
  try {
    const res = await axios.post(UPDATE_LIST_NOTIFY, params)
    if (res && res.data.status) {
      dispatch({ type: UPDATE_NOTIFY_SUCCESS, payload: params.idNotify })
    } else dispatch({ type: UPDATE_NOTIFY_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: UPDATE_NOTIFY_FAILED, payload: error })
  }
}
export const deleteNotify = params => async dispatch => {
  try {
    const res = await axios.post(DELETE_NOTIFY_USER, params)

    if (res && res.data.status) {
      dispatch({ type: DELETE_NOTIFY_SUCCESS, payload: params.id })
    } else dispatch({ type: DELETE_NOTIFY_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: DELETE_NOTIFY_FAILED, payload: error })
  }
}
