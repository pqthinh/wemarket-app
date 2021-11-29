import React from 'react'
import MapScreen from './MapScreen'
import { PlaceProvider } from '../../context/PlacesManager'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import MapModal from '../../components/MapModal'
const Stack = createStackNavigator()
export default function Map() {
  return (
    <PlaceProvider>
      <Stack.Navigator initialRouteName='Map Screen'>
        <Stack.Screen
          name='Map Screen'
          component={MapScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: 'Bản đồ'
          }}
        />
        <Stack.Screen
          name='Map Modal'
          component={MapModal}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={({ route }) => ({
            headerTitleAlign: 'center',
            headerShown: true,
            title: route.params.name
          })}
        />
      </Stack.Navigator>
    </PlaceProvider>
  )
}
