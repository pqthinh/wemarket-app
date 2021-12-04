import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Profile from 'components/ProfileUser/Profile'
import EditAvatar from 'components/ProfileUser/EditAvatar'
const Stack = createStackNavigator()

export default function EditProfileStack() {
  return (
    <Stack.Navigator initialRouteName='Sửa hồ sơ'>
      <Stack.Screen
        name='Sửa hồ sơ'
        component={Profile}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='Xem trước ảnh đại diện'
        component={EditAvatar}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}
