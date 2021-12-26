import React, { useState, useEffect, useCallback } from 'react'
import { View } from 'react-native'
import { Text, Avatar, Button } from '@ui-kitten/components'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { updateAvatar } from 'actions/profileActions'
import { useNavigation } from '@react-navigation/native'
const EditAvatar = () => {
  const navigation = useNavigation()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const profileReducer = useSelector(state => {
    return state.manageProfile
  })
  const dispatch = useDispatch()
  const route = useRoute()
  const uri = route.params.image.uri
  useEffect(() => {
    console.log(profileReducer.uri, 'avatar')
  }, [profileReducer])
  const onSubmitPress = useCallback(
    (image, user) => {
      dispatch(updateAvatar(image, user))
      navigation.goBack()
    },
    [dispatch]
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        {uri && (
          <Avatar
            source={{ uri }}
            size='large'
            style={{ width: 300, height: 300 }}
          />
        )}
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          onPress={() =>
            onSubmitPress(route.params.image, userReducer.userInfo)
          }
        >
          Lưu ảnh
        </Button>
      </View>
    </View>
  )
}

export default EditAvatar
