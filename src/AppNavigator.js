import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TransitionPresets } from '@react-navigation/stack'
import { HomeScreen } from './views/HomeScreen'
import { DetailsScreen } from './views/DetailsScreen'
import { TabNavigator } from './tab'
import { HOME_SCREEN, CHATS_SCREEN } from './helper/ScreenName'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator
    screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: true
      // ...TransitionPresets.ModalPresentationIOS
    })}
  >
    <Screen name={HOME_SCREEN} component={HomeScreen} />
    <Screen name='Details' component={DetailsScreen} />
    <Screen name={CHATS_SCREEN} component={TabNavigator} />
  </Navigator>
)

export const AppNavigator = () => {
  return <HomeNavigator />
}
