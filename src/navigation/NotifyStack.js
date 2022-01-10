import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotifyScreen from 'screens/NotifyScreens'
import ChatStack from './ChatStack'
const { Navigator, Screen } = createStackNavigator()
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'
const screenOptions = {
  headerShown: false
}

export default function NotifyStack() {
  return (
    <Navigator initialRouteName='Thông báo'>
      <Screen
        name='Thông báo'
        component={NotifyScreen}
        options={screenOptions}
      />

      <Screen
        name='ChatScreen'
        component={ChatStack}
        options={{ headerShown: false, title: 'Chat' }}
      />
      <Screen
        name={SIGN_IN_SCREEN}
        component={SignIn}
        options={{ headerShown: true, title: 'Đăng nhập' }}
      />
      <Screen
        name={SIGN_UP_SCREEN}
        component={SignUp}
        options={{ headerShown: true, title: 'Đăng ký' }}
      />
    </Navigator>
  )
}
