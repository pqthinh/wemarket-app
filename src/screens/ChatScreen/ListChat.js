import { Layout } from '@ui-kitten/components'
import { getChatList } from 'actions/chatActions'
import { toggleBottom } from 'actions/userActions'
import { firebase } from 'configs/firebaseConfig'
import { withNumber } from 'exp-value'
import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ChatListItem from './ChatListItem'

function ListChat() {
  const dispatch = useDispatch()
  const listChatReducer = useSelector(state => {
    return state.manageChat
  })

  useEffect(() => {
    dispatch(toggleBottom(true))
    return () => dispatch(toggleBottom(false))
  }, [])

  useEffect(() => {
    const user = firebase.auth().currentUser
    if (!user) return
    dispatch(getChatList(user))
  }, [])

  if (withNumber('chatList.length', listChatReducer) < 1)
    return (
      <Layout style={styles.container}>
        <Image
          source={require('images/no-room-chat-bg.png')}
          style={styles.image}
        />
      </Layout>
    )

  return (
    <FlatList
      style={{ width: '100%' }}
      data={listChatReducer.chatList}
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
  },
  image: {
    resizeMode: 'contain'
  }
})
