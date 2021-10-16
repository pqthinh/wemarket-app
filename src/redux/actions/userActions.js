// import AsyncStorage from '@react-native-async-storage/async-storage'
import { firebase } from 'configs/firebaseConfig'
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from '../actionTypes/userActionTypes'

export const signup =
  ({ data }) =>
  async dispatch => {
    try {
      const { email, password } = data
      dispatch({ type: SIGNUP_REQUEST })
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      dispatch({ type: SIGNUP_SUCCESS, payload: res })
    } catch (error) {
      let message
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email đã được sử dụng'
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email không đúng định dạng'
      } else message = withEmpty('message', error)
      dispatch({ type: SIGNUP_FAILED, payload: message })
    }
  }
export const login =
  ({ email, password }) =>
  async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST })
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      if (res) dispatch({ type: LOGIN_SUCCESS, payload: res })
    } catch (error) {
      let message
      switch (error?.code) {
        case 'auth/user-not-found':
          message = 'Tài khoản không tồn tại'
          break
        case 'auth/wrong-password':
          message = 'Mật khẩu ko chính xác '
          break
        case 'auth/too-many-requests':
          message = 'Đăng nhập quá số lần quy định'
          break
        default:
          message = error.toString() || 'Lỗi mạng '
          break
      }
      dispatch({ type: LOGIN_FAILED, payload: message })
    }
  }

export const logout = () => {
  async dispatch => {
    try {
      const res = await firebase.auth().signOut()
      dispatch({ type: LOGOUT, payload: res })
    } catch (error) {
      console.log(error)
      dispatch({ type: LOGOUT, payload: 'Logout failed' || error.toString() })
    }
  }
}
