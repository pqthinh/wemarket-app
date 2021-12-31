import React, { useEffect, useState, useRef } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { firebase } from 'configs/firebaseConfig'
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
import { onChatContent } from 'actions/chatActions'
//const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
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

  let user = firebase.auth().currentUser

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
        // Changing the key of the flatlist otherwise it doesn't update
      />

      <InputBox chatRoomID={id} />
    </View>
  )
}

export default ChatScreen
