import React, { useState, useEffect, useCallback } from 'react'
import { View } from 'react-native'
import { Text, Avatar, Button } from '@ui-kitten/components'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { updateAvatar } from 'actions/profileActions'

const EditAvatar = () => {
  const dispatch = useDispatch()
  const route = useRoute()
  const uri = route.params.uri
  const profileUserReducer = useSelector(state => {
    return state.manageProfile
  })
  useEffect(() => {
    console.log(profileUserReducer, 'profile')
  }, [profileUserReducer])
  const onSubmitPress = useCallback(
    image => dispatch(updateAvatar(image)),
    [dispatch]
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        {uri && <Avatar source={{ uri }} style={{ width: 300, height: 300 }} />}
      </View>
      <View style={{ marginTop: 30 }}>
        <Button onPress={() => onSubmitPress(uri)}>Lưu ảnh</Button>
      </View>
    </View>
  )
}

export default EditAvatar
