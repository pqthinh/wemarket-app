import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
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
  console.log(chatList, 'list chat')
  if (chatList == '')
    return (
      <Layout style={styles.container}>
        <Text category='h4'>Không có lịch sử chat</Text>
      </Layout>
    )
  else
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
const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    marginVertical: 8
  }
})
