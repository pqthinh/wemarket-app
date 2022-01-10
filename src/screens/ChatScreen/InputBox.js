import { Text } from '@ui-kitten/components'
import { onChatContent, sendMessage } from 'actions/chatActions'
import { firebase } from 'configs/firebaseConfig'
import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const InputBox = ({ chatRoomID }) => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  // const { chatRoomID } = props
  const icon = '👍'
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  let user = firebase.auth().currentUser
  const handleCameraPermission = async () => {
    let permissionCheck = ''
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.CAMERA)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(PERMISSIONS.IOS.CAMERA)
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.CAMERA)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.CAMERA)
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }
  }
  const handleLibraryPermission = async () => {
    let permissionCheck = ''
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        )
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }
  }
  useEffect(() => {
    setMessages([])
    let unsub = onChatContent(chatRoomID, setMessages, setUsers)
    return unsub
  }, [chatRoomID])

  const handleInputKeyUp = e => {
    if (e.keyCode === 13) {
      handleSendClick()
    }
  }

  const handleSendClick = () => {
    if (message !== '') {
      sendMessage(chatRoomID, user, 'text', message, users)
      setMessage('')
    }
  }
  const handleSendLike = () => {
    sendMessage(chatRoomID, user, 'text', icon, users)
  }

  const launch_Camera = () => {
    handleCameraPermission.then(() => {
      let options = {
        includeBase64: true,
        mediaType: 'photo'
      }
      launchCamera(options, response => {
        _handleImagePicked(response)
      })
    })
  }
  const launch_ImageLibrary = () => {
    handleLibraryPermission.then(() => {
      let options = {
        includeBase64: true,
        mediaType: 'photo'
      }
      launchImageLibrary(options, response => {
        _handleImagePicked(response)
      })
    })
  }
  const _handleImagePicked = async pickerResult => {
    try {
      setUploading(true)

      if (pickerResult.assets) {
        let imageUri = pickerResult
          ? `data:image/jpg;base64,${pickerResult.assets[0].base64}`
          : null

        sendMessage(chatRoomID, user, 'photo', imageUri, users)

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
        {!message ? (
          <TouchableOpacity style={styles.likeButton} onPress={handleSendLike}>
            <Text style={styles.textIcon}>👍</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSendClick}>
              <MaterialIcons name='send' size={26} color='white' />
            </TouchableOpacity>
          </View>
        )}
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
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5
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
  },
  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textIcon: {
    fontSize: 25
  }
})
