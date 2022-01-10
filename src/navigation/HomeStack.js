import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from 'screens/HomeScreen'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'
import MapSelect from 'screens/MapSelect'
import ProductScreen from 'screens/ProductScreen'
import SettingMap from 'screens/HomeScreen/SettingMap'
import ChatStack from './ChatStack'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import SearchScreen from 'screens/SearchScreen'
import OrderScreen from 'screens/OrderScreen'
import UserProfile from 'screens/UserProfile'
import SameProduct from 'screens/SameProduct'
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
      name='OrderScreen'
      component={OrderScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='SameProductScreen'
      component={SameProduct}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='Search'
      component={SearchScreen}
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
    <Stack.Screen
      name='UserScreen'
      component={UserProfile}
      options={({ route }) => ({
        headerTitleAlign: 'center',
        headerShown: true,
        title: `Trang cá nhân của ${route.params.username}`
      })}
    />
    <Stack.Screen
      name={SIGN_IN_SCREEN}
      component={SignIn}
      options={{ headerShown: true, title: 'Đăng nhập' }}
    />
    <Stack.Screen
      name={SIGN_UP_SCREEN}
      component={SignUp}
      options={{ headerShown: true, title: 'Đăng ký' }}
    />
  </Stack.Navigator>
)
export default HomeStack
