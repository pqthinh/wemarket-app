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
  const dispatch = useDispatch()
  const listMessageReducer = useSelector(state => {
    return state.manageChat
  })
  function LogoTitle() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: 70,
          justifyContent: 'space-between',
          marginRight: 10
        }}
      ></View>
    )
  }
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  const route = useRoute()
  // const body = useRef();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: props => <LogoTitle {...props} />
    })
  }, [navigation])
  let user = firebase.auth().currentUser
  useEffect(() => {
    setMessages(listMessageReducer.messages)
    console.log(listMessageReducer.messages)
    setUsers(listMessageReducer.users)
  }, [listMessageReducer])
  useEffect(() => {
    // setMessages([])
    // let unsub = Api.onChatContent(route.params.id, setMessages, setUsers)
    return dispatch(onChatContent(route.params.id))
  }, [route.params.id])

  const yourRef = useRef()

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <FlatList
        ref={yourRef}
        inverted={true}
        data={messages}
        renderItem={({ item, key }) => (
          <ChatMessage myId={user.id} message={item} index={key} />
        )}
        keyExtractor={(_, index) => index.toString()}
        // Changing the key of the flatlist otherwise it doesn't update
      />

      <InputBox chatRoomID={route.params.id} />
    </View>
  )
}

export default ChatScreen
