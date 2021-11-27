import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ChatListItem from './ChatListItem'
import { firebase } from 'configs/firebaseConfig'
import { getChatList } from 'actions/chatActions'
function ListChat() {
  const dispatch = useDispatch()
  const listChatReducer = useSelector(state => {
    return state.manageChat
  })
  const [chatList, setChatList] = useState([])
  let user = firebase.auth().currentUser
  useEffect(() => {
    console.log(listChatReducer)
    setChatList(listChatReducer.chatList)
  }, [listChatReducer])
  useEffect(() => {
    // const getList = async () => {
    //   if (user !== null) {
    //     firebase
    //       .firestore()
    //       .collection('users')
    //       .doc(user.id)
    //       .onSnapshot(doc => {
    //         if (doc.exists) {
    //           let data = doc.data()
    //           if (data.chats) {
    //             setChatList(data.chats)
    //           }
    //         }
    //       })
    //   }
    // }
    // getList()
    dispatch(getChatList(user))
  }, [])

  return (
    <FlatList
      style={{ width: '100%' }}
      data={chatList}
      renderItem={({ item, index }) => (
        <ChatListItem chatRoom={item} index={index} />
      )}
      keyExtractor={item => item.chatId}
    />
  )
}

export default ListChat
