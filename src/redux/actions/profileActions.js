import { firebase } from 'configs/firebaseConfig'
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_USER_SUCCESS
} from '../actionTypes/profileActionType'
import useFirebase from 'hooks/useFirebase'
const db = firebase.firestore()

export const getUserDetails = () => async dispatch => {
  let user = firebase.auth().currentUser
  return db
    .collection('users')
    .doc(user.uid)
    .get()
    .then(function (doc) {
      let userDetails = doc.data()
      return dispatch({
        type: FETCH_USER_SUCCESS,
        currentUser: userDetails
      })
    })
    .catch(function (error) {
      return dispatch({
        type: FETCH_USER_ERROR,
        error: error
      })
    })
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
