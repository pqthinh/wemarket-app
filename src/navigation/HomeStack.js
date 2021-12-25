import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import MapSelect from 'screens/MapSelect'
import ProductScreen from 'screens/ProductScreen'
import SettingMap from '../screens/HomeScreen/SettingMap'
import ChatStack from './ChatStack'
import ChatScreen from 'screens/ChatScreen/ChatScreen'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='HOME'
      options={{ title: 'Trang chủ', headerShown: false }}
      component={HomeScreen}
    />
    <Stack.Screen
      name='DETAIL_PRODUCT'
      options={{ title: 'Chi tiết', headerShown: false }}
      component={ProductScreen}
    />
    <Stack.Screen
      name='ChatScreen'
      component={ChatStack}
      options={{ headerShown: false, title: 'Chat' }}
    />
    <Stack.Screen
      name='FilterHome'
      component={SettingMap}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='MapSelect'
      component={MapSelect}
      options={{ headerShown: false }}
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
)
export default HomeStack
