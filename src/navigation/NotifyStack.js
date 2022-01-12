import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotifyScreen from 'screens/NotifyScreens'
import ChatStack from './ChatStack'
const { Navigator, Screen } = createStackNavigator()

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
    </Navigator>
  )
}
