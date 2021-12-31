import { useRoute } from '@react-navigation/native'
import { firebase } from 'configs/firebaseConfig'
import { withArray } from 'exp-value'
import React, { useRef } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ChatMessage from './ChatMessage'
import InputBox from './InputBox'
//const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
function ChatScreen({ navigation }) {
  const route = useRoute()
  const id = route.params.id

  const dispatch = useDispatch()
  const listMessageReducer = useSelector(state => {
    return state.manageChat
  })

  let user = firebase.auth().currentUser

  const yourRef = useRef()

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        ref={yourRef}
        inverted={true}
        data={withArray('messages', listMessageReducer)}
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
