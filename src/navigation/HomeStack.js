import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import ProductScreen from 'screens/ProductScreen'
import ChatStack from './ChatStack'
import SettingMap from '../screens/HomeScreen/SettingMap'
const { Navigator, Screen } = createStackNavigator()

const HomeStack = () => (
  <Navigator>
    <Screen
      name='HOME'
      options={{ title: 'Trang chủ', headerShown: false }}
      component={HomeScreen}
    />
    <Screen
      name='DETAIL_PRODUCT'
      options={{ title: 'Chi tiết' }}
      component={ProductScreen}
    />
    <Screen
      name='ChatScreen'
      component={ChatStack}
      options={{ headerShown: false, title: 'Chat' }}
    />
    <Screen
      name='FilterHome'
      component={SettingMap}
      options={{ headerShown: false }}
    />
  </Navigator>
)
export default HomeStack
