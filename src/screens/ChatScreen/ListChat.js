import { Layout } from '@ui-kitten/components'
import { getChatList } from 'actions/chatActions'
import { toggleBottom } from 'actions/userActions'
import React, { useEffect } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ChatListItem from './ChatListItem'

function ListChat() {
  const [chatList, setChatList] = useState([])
  const user = useSelector(state => state.userState?.userInfo)

  useEffect(() => {
    dispatch(toggleBottom(true))
    return () => dispatch(toggleBottom(false))
  }, [])

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
