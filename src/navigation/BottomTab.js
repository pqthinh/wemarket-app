import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text
} from '@ui-kitten/components'
import React from 'react'
import Map from 'screens/MapScreen'
import MapSelect from 'screens/MapSelect'
import { HOME_SCREEN } from 'utils/ScreenName'
import ChatStack from './ChatStack'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'
const { Navigator, Screen } = createBottomTabNavigator()

const HomeIcon = props => <Icon {...props} name='home' pack='material' />
const MapIcon = props => <Icon {...props} name='map' pack='material' />
const MessageIcon = props => (
  <Icon {...props} name='question-answer' pack='material' />
)
const ProfileIcon = props => <Icon {...props} name='person' pack='material' />
const IconPostNews = props => (
  <Icon
    {...props}
    name='add-circle'
    style={[
      props.style,
      {
        position: 'absolute',
        bottom: -20,
        height: 60,
        width: 60,
        borderRadius: 60,
        alignSelf: 'center',
        backgroundColor: '#F2F3F7'
      }
    ]}
    pack='material'
  />
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    // appearance='noIndicator'
    selectedIndex={state.index}
    tabBarOptions={{
      keyboardHidesTabBar: true
    }}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Trang chủ' icon={HomeIcon} />
    <BottomNavigationTab title='Bản đồ' icon={MapIcon} />
    <BottomNavigationTab icon={IconPostNews} />
    <BottomNavigationTab title='Tin nhắn' icon={MessageIcon} />
    <BottomNavigationTab title='Trang cá nhân' icon={ProfileIcon} />
  </BottomNavigation>
)
export default function BottomTab({}) {
  return (
    <Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: '#E26740',
        tabBarBadgeStyle: {
          backgroundColor: '#EB5757',
          color: '#FFFFFF',
          fontSize: 12
        },
        headerShown: false
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Screen
        name={HOME_SCREEN}
        component={HomeStack}
        options={{
          tabBarVisible: false
        }}
      />
      <Screen name='Map' component={Map} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name='ChatScreen' component={ChatStack} />
      <Screen name='Profile' component={ProfileStack} />
    </Navigator>
  )
}
