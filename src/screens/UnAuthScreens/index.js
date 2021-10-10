import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useApp } from 'stores/app-context'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SplashScreen from './SplashScreen'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false
}

export default function UnAuthScreens() {
  const { showRealApp, onShowRealApp } = useApp()
  if (!showRealApp) return <SplashScreen onDone={onShowRealApp} />

  return (
    <Stack.Navigator initialRouteName={SIGN_IN_SCREEN}>
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
