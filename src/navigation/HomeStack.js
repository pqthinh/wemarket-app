import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import ProductScreen from 'screens/ProductScreen'

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
  </Navigator>
)
export default HomeStack
