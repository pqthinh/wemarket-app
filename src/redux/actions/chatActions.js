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
import axios from 'configs/api/baseUrl'

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
export const checkUser = async me => {
  let results = await db.collection('users').get()
  results.forEach(result => {
    if (result.uid == me.uid) {
      return true
    } else return false
  })
}

export const getChatList = async (user, setChatList) => {
  // let chatList = []

  await db
    .collection('users')
    .doc(user.uid)
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        if (data.chats) {
          const byDate = data.chats.sort(function (a, b) {
            return (
              Date.parse(b?.lastMessageDate) - Date.parse(a?.lastMessageDate)
            )
          })
          console.log(byDate, 'arrays chats')
          setChatList(byDate)
        }
      }
    })
}
export const findRoom = async (me, friend, navigation) => {
  let u = await db.collection('users').doc(me.uid).get()
  let uData = u.data()
  if (uData.chats) {
    let chats = [...uData.chats]
    for (let e in chats) {
      if (chats[e].with == friend.uid) {
        return navigation.navigate('Chat', {
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

  await db
    .collection('users')
    .doc(me.uid)
    .update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: friend.username,
        image: friend.avatar,
        with: friend.uid
      })
    })

  await db
    .collection('users')
    .doc(friend.uid)
    .update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: me.username,
        image: me.avatar,
        with: me.uid
      })
    })
  await navigation.navigate('Chat', {
    id: newChat.id,
    name: friend.username
  })
}

export const onChatContent = (chatId, setList, setUsers) => {
  return db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(doc => {
      if (doc.exists) {
        let data = doc.data()
        setList(data.messages.reverse())
        setUsers(data.users)
      }
    })
}

export const sendMessage = async (chatId, me, type, body, users) => {
  let now = new Date().toJSON()
  const tmp = await axios.post('/fcm/chat', {
    title: 'Tin nhắn mới',
    content: 'test'
  })

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
          chats[e].type = type
        }
      }

      await db.collection('users').doc(users[i]).update({
        chats
      })
    }
  }
}
