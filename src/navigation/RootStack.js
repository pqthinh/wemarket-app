import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import UnAuthScreens from '../screens/UnAuthScreens'
import BottomTab from './BottomTab'
import StackMap from 'screens/MapScreen'
const { Navigator, Screen } = createStackNavigator()

export const RootStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name='App' component={BottomTab} />
    {/* <Screen name='Map' component={Map} /> */}
    <Screen name='UnAuth' component={UnAuthScreens} />
  </Navigator>
)
