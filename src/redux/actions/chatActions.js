import { firebase } from 'configs/firebaseConfig'
import {
  USER_STATE_CHANGE,
  GET_LIST_CHAT_SUCCESS,
  GET_LIST_CHAT_FAILED,
  FETCH_ROOM_SUCCESS,
  REGISTER_ROOM,
  GET_CONTENT_CHAT,
  SEND_MESSAGE
} from '../actionTypes/chatActionType'

const db = firebase.firestore()

export const addUser = async user => {
  await db.collection('users').doc(user.uid).set(
    {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    },
    { merge: true }
  )
}
export const fetchUser = async user => {
  return dispatch => {
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
        } else {
          console.log('does not exist')
        }
      })
  }
}
//   getUserDetails: async () => {
//     let user = firebase.auth().currentUser
//     return db
//       .collection('users')
//       .doc(user.uid)
//       .get()
//       .then(function (doc) {
//         let userDetails = doc.data()
//         return userDetails
//       })
//       .catch(function (error) {
//         console.log('Error getting documents: ', error)
//       })
//   },
//   uploadAvatar: async avatarImage => {
//     let user = firebase.auth().currentUser

//     await db.collection('users').doc(user.uid).update({
//       avatar: avatarImage
//     })
//     firebase.auth().currentUser.updateProfile({
//       photoURL: avatarImage
//     })
//     let results = await db.collection('users').get()
//     results.forEach(result => {
//       let data = result.data()
//       if (result.id !== user.uid) {
//         if (data.chats) {
//           let chats = [...data.chats]
//           for (let e in chats) {
//             if (chats[e].with == user.uid) {
//               chats[e].image = avatarImage
//             }
//           }

//           db.collection('users').doc(result.id).update({
//             chats
//           })
//         }
//       }
//     })
//   },
export const checkUser = async me => {
  let results = await db.collection('users').get()
  results.forEach(result => {
    if (result.uid == me.uid) {
      return true
    } else return false
  })
}
//   getContactList: async userId => {
//     let list = []

//     let results = await db.collection('users').get()
//     results.forEach(result => {
//       let data = result.data()
//       if (result.id !== userId) {
//         list.push({
//           id: result.id,
//           name: data.name,
//           avatar: data.avatar
//         })
//       }
//     })
//     return list
//   },
export const getChatList = me => async dispatch => {
  let chatList = []
  await db
    .collection('users')
    .doc(me.uid)
    .onSnapshot(doc => {
      if (doc.exists) {
        let list = doc.data().chats
        if (list) {
          chatList.push(list)
        }
        dispatch({
          type: GET_LIST_CHAT_SUCCESS,
          chatList: chatList[0]
        })
      } else {
        dispatch({ type: GET_LIST_CHAT_FAILED, error: 'Có lỗi xuất hiện' })
      }
    })

  //return chatList;
}
export const findRoom = (me, friend) => async dispatch => {
  let u = await db.collection('users').doc(me.uid).get()
  let uData = u.data()
  if (uData.chats) {
    let chats = [...uData.chats]
    for (let e in chats) {
      if (chats[e].with == friend.uid) {
        // return navigation.navigate('Chat', {
        //     id: chats[e].chatId,
        //     name: chats[e].title,
        //   });
        return dispatch({
          type: FETCH_ROOM_SUCCESS,
          id: chats[e].chatId,
          name: chats[e].title
        })
      }
    }
  }
  let newChat = await db.collection('chats').add({
    messages: [],
    users: [me.uid, friend.uid]
  })

  db.collection('users')
    .doc(me.uid)
    .update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: friend.username,
        image: friend.avatar,
        with: friend.uid
      })
    })

  db.collection('users')
    .doc(friend.uid)
    .update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: me.username,
        image: me.avatar,
        with: me.uid
      })
    })
  return dispatch({
    type: REGISTER_ROOM,
    id: newChat.id,
    name: friend.username
  })
}
// export const addNewChat = (me, friend) => async dispatch => {

//   // await Api.addNewChat(user, user2);
// }

export const onChatContent = chatId => async dispatch => {
  return db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        //   setList(data.messages.reverse())
        //   setUsers(data.users)

        dispatch({
          type: GET_CONTENT_CHAT,
          messages: data.messages.reverse(),
          users: data.users
        })
      }
    })
}

export const sendMessage =
  (chatId, me, type, body, users) => async dispatch => {
    let now = new Date().toJSON()

    db.collection('chats')
      .doc(chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          type,
          author: me.uid,
          body,
          date: now
        })
      })
    // let users = onChatContent(chatId,dispatch)
    for (let i in users) {
      let u = await db.collection('users').doc(users[i]).get()
      let uData = u.data()
      if (uData.chats) {
        let chats = [...uData.chats]
        for (let e in chats) {
          if (chats[e].chatId == chatId) {
            chats[e].lastMessage = body
            chats[e].lastMessageDate = now
            chats[e].author = me.uid
          }
        }

        await db.collection('users').doc(users[i]).update({
          chats
        })
      }
    }
    dispatch({
      type: SEND_MESSAGE,
      body: body
    })
  }
