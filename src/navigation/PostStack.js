import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CreateProductScreen from 'screens/CreateProductScreen'
import ProductScreen from 'screens/ProductScreen'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'

import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import MapSelect from 'screens/MapSelect'

const { Navigator, Screen } = createStackNavigator()

const PostStack = () => {
  return (
    <Navigator>
      <Screen
        name='FormPost'
        options={{ title: 'Tạo bài đăng bán', headerShown: false }}
        component={CreateProductScreen}
      />
      <Screen
        name='MapSelect'
        options={{ headerShown: false }}
        component={MapSelect}
      />
      <Screen
        name='PreviewPost'
        options={{ title: 'Chi tiết' }}
        component={ProductScreen}
      />
      <Screen
        name={SIGN_IN_SCREEN}
        component={SignIn}
        options={{ headerShown: true, title: 'Đăng nhập' }}
      />
      <Screen
        name={SIGN_UP_SCREEN}
        component={SignUp}
        options={{ headerShown: true, title: 'Đăng ký' }}
      />
      <Screen
        name='DETAIL_PRODUCT'
        options={{ title: 'Chi tiết', headerShown: false }}
        component={ProductScreen}
      />
    </Navigator>
  )
}
export default PostStack
