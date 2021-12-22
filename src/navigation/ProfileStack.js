import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import SignIn from 'screens/UnAuthScreens/SignIn'
import SignUp from 'screens/UnAuthScreens/SignUp'
import ProfileScreen from 'screens/ProfileScreen'
import EditProfileStack from './EditProfileStack'
import ChatStack from './ChatStack'
import BookmarkScreen from 'screens/ProfileScreen/BookMark'
import SeenRecentScreen from 'screens/ProfileScreen/SeenRecent'
const { Navigator, Screen } = createStackNavigator()

const screenOptions = {
  headerShown: false
}

export default function ProfileStack() {
  return (
    <Navigator initialRouteName='Trang cá nhân'>
      <Screen
        name='Trang cá nhân'
        component={ProfileScreen}
        options={screenOptions}
      />
      <Screen
        name='Sửa trang cá nhân'
        component={EditProfileStack}
        options={screenOptions}
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
      <Screen name='ChatScreen' component={ChatStack} options={screenOptions} />
      <Screen
        name='Bookmark Screen'
        component={BookmarkScreen}
        options={{ headerShown: true, title: 'Đã lưu' }}
      />
      <Screen
        name='SeenRecent Screen'
        component={SeenRecentScreen}
        options={{ headerShown: true, title: 'Đã xem gần đây' }}
      />
    </Navigator>
  )
}
