import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import ChatListItem from './ChatListItem'
import { getChatList } from 'actions/chatActions'
function ListChat() {
  const [chatList, setChatList] = useState([])
  const user = useSelector(state => state.userState.userInfo)

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        getChatList(user, setChatList)
      }
    }
    getList()
  }, [])

  if (chatList == [])
    return (
      <Layout style={styles.container}>
        <Image
          source={require('images/no-room-chat-bg.png')}
          style={styles.image}
        />
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
  },
  image: {
    resizeMode: 'contain'
  }
})
