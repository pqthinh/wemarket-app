import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from './HomeScreen'
import { DetailsScreen } from './DetailsScreen'
import { TabNavigator } from 'tab'
import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'

const { Navigator, Screen } = createStackNavigator()

export default function AuthScreens() {
  return (
    <Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Screen name={HOME_SCREEN} component={HomeScreen} />
      <Screen name='Details' component={DetailsScreen} />
      <Screen name={CHAT_SCREEN} component={TabNavigator} />
    </Navigator>
  )
}
