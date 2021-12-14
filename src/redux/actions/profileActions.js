import { firebase } from 'configs/firebaseConfig'
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  UPDATE_USER_SUCCESS
} from '../actionTypes/profileActionType'
import { GET_POST_USER } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import useFirebase from 'hooks/useFirebase'
const db = firebase.firestore()

export const getPostUser = params => async dispatch => {
  console.log(params)
  try {
    //dispatch({ type: FETCH_POST_REQUEST })
    const res = await axios.post(GET_POST_USER, params)
    if (res && res.data) {
      dispatch({ type: FETCH_POST_SUCCESS, payload: res.data })
    } else dispatch({ type: FETCH_POST_FAILED, payload: 'Có lỗi xuất hiện' })
  } catch (error) {
    dispatch({ type: FETCH_POST_FAILED, payload: error })
  }
}
export const updateAvatar = avatarImage => async dispatch => {
  console.log(avatarImage)
  const uri = useFirebase({ avatarImage })
  let user = firebase.auth().currentUser
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
  dispatch({
    type: UPDATE_USER_SUCCESS,
    uri: uri
  })
}
