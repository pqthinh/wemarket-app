import { useRoute } from '@react-navigation/native'

import { useSelector } from 'react-redux'

import { firebase } from 'configs/firebaseConfig'

import React, { useRef, useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
import { onChatContent } from 'actions/chatActions'

function ChatScreen({ navigation }) {
  const route = useRoute()
  const id = route.params.id
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    setData([])
    let unsub = onChatContent(id, setData, setUsers)
    return unsub
  }, [id])

  const user = useSelector(state => state.userState?.userInfo)

  const yourRef = useRef()

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        ref={yourRef}
        inverted={true}
        data={data}
        renderItem={({ item, key }) => (
          <ChatMessage myId={user.uid} message={item} index={key} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <InputBox chatRoomID={id} />
    </View>
  )
}

export default ChatScreen
