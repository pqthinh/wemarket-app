import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import ProductScreen from 'screens/ProductScreen'

const { Navigator, Screen } = createStackNavigator()

const HomeStack = () => (
  <Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name='HOME' component={HomeScreen} />
    <Screen name='DETAIL_PRODUCT' component={ProductScreen} />
  </Navigator>
)
export default HomeStack
