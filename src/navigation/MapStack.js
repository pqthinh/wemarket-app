import React from 'react'
import MapScreen from 'screens/MapScreen'
import { PlaceProvider } from 'context/PlacesManager'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import ChatStack from './ChatStack'
const Stack = createStackNavigator()
export default function MapStack() {
  return (
    <PlaceProvider>
      <Stack.Navigator initialRouteName='Map Screen'>
        <Stack.Screen
          name='Map Screen'
          component={MapScreen}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            title: 'Bản đồ'
          }}
        />
        <Stack.Screen
          name='ChatScreen'
          component={ChatStack}
          options={{ headerShown: false, title: 'Chat' }}
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
