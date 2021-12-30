import { firebase } from 'configs/firebaseConfig'
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILED,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  RESET_POST
} from '../actionTypes/profileActionType'
import { GET_POST_USER, UPDATE_USER, DELETE_PRODUCT } from 'configs/api/apiPath'

import axios from 'configs/api/baseUrl'
import useFirebase from 'hooks/useFirebase'
const db = firebase.firestore()

export const getPostUser = params => async dispatch => {
  try {
    dispatch({ type: FETCH_POST_REQUEST })
    console.log(params, 'params')
    const res = await axios.post(GET_POST_USER, params)
    if (res && res.data) {
      dispatch({ type: FETCH_POST_SUCCESS, payload: res.data })
    } else dispatch({ type: FETCH_POST_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_POST_FAILED, payload: error })
  }
}
export const resetPost = () => dispatch => {
  dispatch({ type: RESET_POST })
}
export const deletePost = params => async dispatch => {
  try {
    const res = await axios.post(DELETE_PRODUCT, params)
    if (res && res.data.status) {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: params.idProduct })
    } else
      dispatch({ type: DELETE_PRODUCT_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILED, payload: error })
  }
}
export const updateAvatar = (avatarImage, user) => async dispatch => {
  const uri = await useFirebase(avatarImage)
  console.log(uri, 'uri')

  await db.collection('users').doc(user.uid).update({
    photoURl: uri
  })
  firebase.auth().currentUser.updateProfile({
    photoURL: uri
  })
  let results = await db.collection('users').get()
  results.forEach(result => {
    let data = result.data()
    if (result.id !== user.uid) {
      if (data.chats) {
        let chats = [...data.chats]
        for (let e in chats) {
          if (chats[e].with == user.uid) {
            chats[e].image = uri
          }
        }

        db.collection('users').doc(result.id).update({
          chats
        })
      }
    }
  })
  console.log({ uid: user.uid, avatar: uri }, 'params')
  try {
    const res = await axios.post(UPDATE_USER, { uid: user.uid, avatar: uri })
    console.log(res, 'res')
    if (res && res.data.response.status) {
      dispatch({
        type: UPDATE_AVATAR_SUCCESS,
        payload: uri
      })
    } else dispatch({ type: UPDATE_AVATAR_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: UPDATE_AVATAR_FAILED, payload: error })
  }
}
