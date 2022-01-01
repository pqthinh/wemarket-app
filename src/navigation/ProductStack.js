import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductScreen from 'screens/ProductScreen'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import UserProfile from 'screens/UserProfile'
import OrderScreen from 'screens/OrderScreen'
const Stack = createStackNavigator()

const ProductStack = () => (
  <Stack.Navigator initialRouteName='DETAIL_PRODUCT'>
    <Stack.Screen
      name='DETAIL_PRODUCT'
      options={{ title: 'Chi tiết', headerShown: false }}
      component={ProductScreen}
    />
    <Stack.Screen
      name='Chats'
      component={ChatScreen}
      options={{ headerShown: false, title: 'Chat' }}
    />

    <Stack.Screen
      name='OrderScreen'
      component={OrderScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='UserScreen'
      options={{ title: 'Chi tiết', headerShown: false }}
      component={UserProfile}
    />
  </Stack.Navigator>
)
export default ProductStack
