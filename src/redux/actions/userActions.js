import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_GET_USER_DETAIL, REGISTER_USER } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import { firebase } from 'configs/firebaseConfig'
import { withEmpty, withNull, withObject, withBoolean } from 'exp-value'
import {
  LOCATION_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SET_RADIUS,
  TOGGLE_BOTTOM
} from '../actionTypes/userActionTypes'

export const signup =
  ({ data, handleCheck }) =>
  async dispatch => {
    try {
      const avatar =
        'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
      const { email, password, name, phone, address } = data

      console.log(data, 'data')
      dispatch({ type: SIGNUP_REQUEST })
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      // push to firestore
      await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: name,
          photoURL: avatar
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
      const uid = withNull('user.uid', res)
      // add to database
      const registerUser = await axios.post(REGISTER_USER, {
        username: name,
        email: email,
        phone: phone,
        address: address,
        uid: uid,
        avatar: avatar
      })

      if (withBoolean('data.status', registerUser)) {
        dispatch({ type: SIGNUP_SUCCESS, payload: 'Đăng ký thành công' })
        handleCheck(SIGNUP_SUCCESS, true, 'Đăng ký thành công')
      } else {
        dispatch({ type: SIGNUP_FAILED, payload: 'Email đã được sử dụng' })
        handleCheck(SIGNUP_FAILED, true, 'Email đã được sử dụng')
      }
    } catch (error) {
      let message
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email đã được sử dụng'
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email không đúng định dạng'
      } else message = withEmpty('message', error)

      dispatch({ type: SIGNUP_FAILED, payload: message })

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

      if (withEmpty('user.uid', res)) {
        const getUserInfo = await axios.get(
          API_GET_USER_DETAIL(withEmpty('user.uid', res))
        )

        if (withNull('data.status', getUserInfo)) {
          console.log(withNull('data.status', getUserInfo))
          dispatch({
            type: LOGIN_SUCCESS,
            payload: withObject('data.data', getUserInfo)
          })
          handleCheck(LOGIN_SUCCESS, true, 'Đăng nhập thành công')
        }
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
      console.log(message)
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

export const getLocation = location => async dispatch => {
  dispatch({ type: LOCATION_SUCCESS, payload: location })
}

export const getRadius = radius => async dispatch => {
  dispatch({ type: SET_RADIUS, payload: radius })
}

export const toggleBottom = hiddenBottom => async dispatch => {
  dispatch({ type: TOGGLE_BOTTOM, payload: hiddenBottom })
}

export const historySearch = data => async dispatch => {
  dispatch({ type: 'SEARCH', payload: data })
}
