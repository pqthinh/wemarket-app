import { Layout } from '@ui-kitten/components'
import { getChatList } from 'actions/chatActions'
import { toggleBottom } from 'actions/userActions'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import ChatListItem from './ChatListItem'

function ListChat() {
  const [chatList, setChatList] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const user = useSelector(state => state.userState?.userInfo)

  useEffect(() => {
    const getList = () => {
      if (user !== null) {
        getChatList(user, setChatList)
        setLoading(false)
      }
    }
    getList()
    dispatch(toggleBottom(true))
    return () => dispatch(toggleBottom(false))
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
  else {
    if (loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.spinnerView}>
            <ActivityIndicator size='large' color='#E26740' />
          </View>
        </SafeAreaView>
      )
    }
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
}
export default ListChat
const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
