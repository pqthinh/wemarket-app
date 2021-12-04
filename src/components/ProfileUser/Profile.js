import React, { Component, useEffect, useState, useCallback } from 'react'
import { Card, Icon, Avatar } from 'react-native-elements'
import {
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { Text } from '@ui-kitten/components'
import { useShowState } from 'core/hooks'
import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import Address from './Address'
import EditModal from './EditModal'
import EditAvatar from './EditAvatar'
import { updateAvatar } from 'actions/profileAction'
const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const profileUserReducer = useSelector(state => {
    return state.manageProfile
  })
  const [userDetails, setUserDetails] = useState({})
  const [pickerResponse, setPickerResponse] = useState(null)
  const [isModalVisible, toggleImageModal] = useShowState()
  useEffect(() => {
    console.log(profileUserReducer)
  }, [profileUserReducer])
  const onSubmitPress = useCallback(
    () => dispatch(updateAvatar(image)),
    [dispatch]
  )
  // useEffect(() => {
  //   fetchUserDetails()
  // }, [userDetails])

  // const fetchUserDetails = async () => {
  //   try {
  //     const user = await Api.getUserDetails()
  //     setUserDetails(user)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const onPressPlace = () => {
  //   console.log('place')
  // }

  // const onPressTel = number => {
  //   Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  // }

  // const onPressSms = () => {
  //   console.log('sms')
  // }

  // const onPressEmail = email => {
  //   Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
  //     console.log('Error:', err)
  //   )
  // }
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }
    launchImageLibrary(options, setPickerResponse)
  }, [])

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false
    }
    launchCamera(options, setPickerResponse)
  }, [])
  const image = pickerResponse?.assets && pickerResponse?.assets[0]
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri
  const { avatar, name, email, phoneNumber, address } = userDetails
  if (uri) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          {uri && (
            <Image source={{ uri }} style={{ width: 300, height: 300 }} />
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <Button title='add post' status='success' onPress={onSubmitPress} />
        </View>
      </View>
      // <EditAvatar uri={uri} />
    )
  } else {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
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
                      size='xlarge'
                      source={{
                        uri:
                          avatar ||
                          'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
                      }}
                      style={{ width: 150, height: 150 }}
                    />
                    <View style={styles.add}>
                      <TouchableOpacity onPress={toggleImageModal}>
                        <Icon type='material' name='camera-alt' fill='#111' />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.userName}>
                    <Text style={styles.userNameText}>
                      {name || 'Người dùng'}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>

            <Email
              email={email || 'test@gmail.com'}
              //onPressEmail={onPressEmail}
            />
            {Separator()}
            <Address address={address || '144 Xuân Thuỷ, Cầu Giấy, Hà Nội'} />
            {Separator()}
            <Tel
              phoneNumber={phoneNumber || '012789125'}
              // onPressSms={onPressSms}
              // onPressTel={onPressTel}
            />
            {Separator()}
          </Card>
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
