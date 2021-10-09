import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TransitionPresets } from '@react-navigation/stack'
import { HomeScreen } from '../views/HomeScreen'
import { DetailsScreen } from '../views/DetailsScreen'
import { TabNavigator } from '../tab'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator
    screenOptions={({ route, navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      ...TransitionPresets.ModalPresentationIOS
    })}
  >
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Details' component={DetailsScreen} />
    <Screen name='Chats' component={TabNavigator} />
  </Navigator>
)

export const AppNavigator = () => {
  return <HomeNavigator />
}
