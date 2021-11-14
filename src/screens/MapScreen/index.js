import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MapModal from 'components/MapModal'
import MapScreen from './MapScreen'

const { Navigator, Screen } = createStackNavigator()

export default function StackMap() {
  return (
    <Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Screen name='MapScreen' component={MapScreen} />
      <Screen name='MapModal' component={MapModal} />
    </Navigator>
  )
}
