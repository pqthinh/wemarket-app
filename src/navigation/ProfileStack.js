import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'
import ProfileScreen from 'screens/ProfileScreen'
const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
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
