import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
// import Api from '../../Api/Api'
import { firebase } from 'configs/firebaseConfig'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { sendMessage } from 'actions/chatActions'
const InputBox = props => {
  const dispatch = useDispatch()
  const listMessageReducer = useSelector(state => {
    return state.manageChat
  })
  const { chatRoomID } = props
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  let user = firebase.auth().currentUser
  useEffect(() => {
    setMessages(listMessageReducer.messages)
    console.log(listMessageReducer.messages)
    setUsers(listMessageReducer.users)
  }, [listMessageReducer])
  useEffect(() => {
    return dispatch(onChatContent(chatRoomID))
  }, [chatRoomID])

  const handleInputKeyUp = e => {
    if (e.keyCode === 13) {
      handleSendClick()
    }
  }

  const handleSendClick = () => {
    if (message !== '') {
      sendMessage(chatRoomID, user.uid, 'text', message, users)
      setMessage('')
    }
  }

  const launch_Camera = () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo'
    }
    launchCamera(options, response => {
      _handleImagePicked(response)
    })
  }
  const launch_ImageLibrary = () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo'
    }
    launchImageLibrary(options, response => {
      _handleImagePicked(response)
    })
  }
  const _handleImagePicked = async pickerResult => {
    try {
      setUploading(true)

      if (pickerResult.assets) {
        let imageUri = pickerResult
          ? `data:image/jpg;base64,${pickerResult.assets[0].base64}`
          : null
        sendMessage(chatRoomID, user.uid, 'photo', imageUri, users)
        setMessage('')
      } else if (pickerResult.didCancel) {
        console.log('User cancelled image picker')
      } else if (pickerResult.error) {
        console.log('ImagePicker Error: ', pickerResult.error)
      }
    } catch (e) {
      console.log(e)
      console.log('Upload failed, sorry :(')
    } finally {
      setUploading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={{ width: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder={'Type a message'}
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            onKeyUp={handleInputKeyUp}
          />

          <TouchableOpacity onPress={launch_ImageLibrary}>
            {!message && (
              <FontAwesome
                name='image'
                size={24}
                color='grey'
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={launch_Camera}>
            {!message && (
              <FontAwesome
                name='camera'
                size={24}
                color='grey'
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {!message ? (
            {}
          ) : (
            <TouchableOpacity onPress={handleSendClick}>
              <MaterialIcons name='send' size={26} color='white' />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default InputBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end'
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10
  },
  icon: {
    marginHorizontal: 5
  },
  buttonContainer: {
    backgroundColor: '#0C6157',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
