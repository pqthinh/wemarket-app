import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'
import ProfileScreen from 'screens/ProfileScreen'
import EditProfileStack from './EditProfileStack'
const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='Trang cá nhân'>
      <Stack.Screen
        name='Trang cá nhân'
        component={ProfileScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name='Sửa trang cá nhân'
        component={EditProfileStack}
        options={screenOptions}
      />
      <Stack.Screen
        name={SIGN_IN_SCREEN}
        component={SignIn}
        options={screenOptions}
      />
      <Stack.Screen
        name={SIGN_UP_SCREEN}
        component={SignUp}
        options={screenOptions}
      />
    </Stack.Navigator>
  )
}
