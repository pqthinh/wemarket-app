import React, { Component, useEffect, useState, useCallback } from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Button
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Text, Avatar } from '@ui-kitten/components'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useShowState } from 'core/hooks'
import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import Address from './Address'
import EditModal from './EditModal'
import { getUserDetail } from 'actions/profileActions'

const Profile = ({ navigation }) => {
  const userReducer = useSelector(state => {
    return state.userState
  })
  const dispatch = useDispatch()
  const [pickerResponse, setPickerResponse] = useState(null)
  const [isModalVisible, toggleImageModal] = useShowState()

<<<<<<< HEAD
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
          ? console.warn('Camera permission granted.')
          : console.warn('Camera permission denied.')
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
          ? console.warn('Camera permission granted.')
          : console.warn('Camera permission denied.')
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
          ? console.warn('Storage permission granted.')
          : console.warn('Storage permission denied.')
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
          ? console.warn('Storage permission granted.')
          : console.warn('Storage permission denied.')
      }
    }
  }
  const onImageLibraryPress = useCallback(() => {
    handleLibraryPermission()
=======
  const onImageLibraryPress = useCallback(() => {
>>>>>>> parent of 7da9de2 (update clean code)
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }
    launchImageLibrary(options, response => {
      _handleImagePicked(response)
    })
  }, [])

  const onCameraPress = useCallback(() => {
<<<<<<< HEAD
    handleCameraPermission()
=======
>>>>>>> parent of 7da9de2 (update clean code)
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false
    }
    launchCamera(options, response => {
      _handleImagePicked(response)
    })
  }, [])
  const _handleImagePicked = pickerResult => {
    if (pickerResult.assets) {
      let image = pickerResult ? pickerResult.assets[0] : null
      setPickerResponse(image)
    } else if (pickerResult.didCancel) {
      console.log('User cancelled image picker')
    } else if (pickerResult.error) {
      console.log('ImagePicker Error: ', pickerResult.error)
    }
  }

  useEffect(() => {
    {
      pickerResponse &&
        navigation.navigate('Xem trước ảnh đại diện', {
          image: pickerResponse
        })
    }
  }, [pickerResponse])

  const { avatar, username, email, phone, address } = userReducer.userInfo

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={{
              uri: 'https://forums.macrumors.com/attachments/img_0215-jpg.685731/'
            }}
          >
            <View style={styles.headerColumn}>
              <View>
                <Avatar
                  rounded
                  size='large'
                  source={{
                    uri:
                      avatar ||
                      'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
                  }}
                  style={{ width: 150, height: 150 }}
                />
                <View style={styles.add}>
                  <TouchableOpacity onPress={toggleImageModal}>
                    <MaterialIcons name='camera-alt' size={24} color='black' />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.userName}>
                <Text style={styles.userNameText}>{username}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <Email email={email} />
        {Separator()}
        <Address address={address} />
        {Separator()}
        <Tel phoneNumber={phone} />
        {Separator()}
      </View>
      <EditModal
        isModalVisible={isModalVisible}
        toggleModal={toggleImageModal}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0
  },
  container: {
    flex: 1
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1
      },
      android: {
        alignItems: 'center'
      }
    })
  },
  placeIcon: {
    color: 'white',
    fontSize: 26
  },
  scroll: {
    backgroundColor: '#FFF'
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  userCityRow: {
    backgroundColor: 'transparent'
  },
  userCityText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  // userImage: {
  //   borderColor: '#FFF',
  //   borderRadius: 80,
  //   borderWidth: 3,
  //   height: 160,
  //   marginBottom: 0,
  //   width: 160,
  // },
  userName: {
    flexDirection: 'row'
  },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
    paddingRight: 5
  },
  nameIcon: {
    marginTop: 5,
    width: 20,
    height: 20
  },
  add: {
    backgroundColor: '#939393',
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
