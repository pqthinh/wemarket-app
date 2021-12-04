import React, { useState } from 'react'
import { View, Image, Button, Text } from 'react-native'
// import * as ImagePicker from 'react-native-image-picker'

const EditAvatar = ({ uri }) => {
  const [avatarImage, setAvatarImage] = useState(null)

  const onSubmit = async () => {
    try {
      const avatar = avatarImage
      await Api.uploadAvatar(avatar.uri)

      setAvatarImage(null)
      navigation.navigate('Profile')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        {uri && <Image source={{ uri }} style={{ width: 300, height: 300 }} />}
      </View>
      <View style={{ marginTop: 30 }}>
        <Button title='add post' status='success' onPress={onSubmit} />
      </View>
    </View>
  )
}

export default EditAvatar
