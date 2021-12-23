import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import MapSelect from 'screens/MapSelect'
import ProductScreen from 'screens/ProductScreen'
import SettingMap from '../screens/HomeScreen/SettingMap'
import ChatStack from './ChatStack'

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
    <Screen
      name='MapSelect'
      component={MapSelect}
      options={{ title: 'Chọn vị trí' }}
    />
  </Navigator>
)
export default HomeStack
