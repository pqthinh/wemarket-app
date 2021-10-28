import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from './HomeScreen'
import { DetailsScreen } from './DetailsScreen'
import { TabNavigator } from 'tab'
import Map from './Map/index'

import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'
import MapSelect from './MapSelect/index'


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
      <Screen name='Map' component={Map} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name={CHAT_SCREEN} component={TabNavigator} />
    </Navigator>
  )
}
