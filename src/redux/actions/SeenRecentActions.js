import {
  FETCH_SEEN_RECENT_REQUEST,
  FETCH_SEEN_RECENT_SUCCESS,
  FETCH_SEEN_RECENT_FAILED
} from '../actionTypes/seenRecentActionTypes'
import { GET_LIST_SEEN_RECENT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'

export const getSeenRecent = uid => async dispatch => {
  try {
    dispatch({ type: FETCH_SEEN_RECENT_REQUEST })
    const res = await axios.get(GET_LIST_SEEN_RECENT(uid))
    if (res && res.data.status) {
      dispatch({
        type: FETCH_SEEN_RECENT_SUCCESS,
        payload: res.data.data.reverse()
      })
    } else
      dispatch({ type: FETCH_SEEN_RECENT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_SEEN_RECENT_FAILED, payload: error })
  }
}
