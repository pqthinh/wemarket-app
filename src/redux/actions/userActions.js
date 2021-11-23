import AsyncStorage from '@react-native-async-storage/async-storage'
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
  ({ data, handleCheck }) =>
  async dispatch => {
    try {
      console.log(1)
      const { email, password, name } = data
      dispatch({ type: SIGNUP_REQUEST })
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
          photoURL:
            'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
        })
        .then(() => {
          let user = firebase.auth().currentUser
          firebase.firestore().collection('users').doc(user.uid).set(
            {
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email
            },
            { merge: true }
          )
        })
      console.log(res)
      dispatch({ type: SIGNUP_SUCCESS, payload: res })
      handleCheck(SIGNUP_SUCCESS, true, 'Success')
    } catch (error) {
      let message
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email đã được sử dụng'
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email không đúng định dạng'
      } else message = withEmpty('message', error)
      dispatch({ type: SIGNUP_FAILED, payload: message })
      console.log(message, 'message')
      handleCheck(SIGNUP_FAILED, false, message)
    }
  }
export const login =
  ({ email, password, handleCheck }) =>
  async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST })
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      if (res) {
        dispatch({ type: LOGIN_SUCCESS, payload: res })
        handleCheck(LOGIN_SUCCESS, true, 'Success')
        // call api cua hoan
      }
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
      handleCheck(LOGIN_FAILED, false, message)
    }
  }

export const logout = () => async dispatch => {
  try {
    const res = await firebase.auth().signOut()
    dispatch({ type: LOGOUT, payload: res })
    await AsyncStorage.removeItem('@root')
  } catch (error) {
    dispatch({ type: LOGOUT, payload: 'Logout failed' || error.toString() })
  }
}

export const showAlert = () => async dispatch => {
  dispatch({ type: SHOW_ALERT, payload: 'Không có quyền truy cập' })
}
