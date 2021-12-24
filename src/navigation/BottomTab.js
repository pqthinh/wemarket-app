import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text
} from '@ui-kitten/components'
import React from 'react'
import MapStack from './MapStack'
import MapSelect from 'screens/MapSelect'
import { HOME_SCREEN } from 'utils/ScreenName'
import NotifyStack from './NotifyStack'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'

const { Navigator, Screen } = createBottomTabNavigator()

const IconPostNews = props => (
  <Icon
    {...props}
    name='add-circle-outline'
    style={[
      props.style,
      {
        position: 'absolute',
        bottom: -20,
        height: 60,
        width: 60,
        borderRadius: 60,
        alignSelf: 'center',
        backgroundColor: 'white'
      }
    ]}
    pack='ionicons'
  />
)
const IconPostNewsPress = props => (
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
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: 'white'
      }
    ]}
    pack='ionicons'
  />
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title='Trang chủ'
      icon={
        <Icon
          name={state.index == 0 ? 'home' : 'home-outline'}
          pack='ionicons'
        />
      }
    />
    <BottomNavigationTab
      title='Bản đồ'
      icon={
        <Icon name={state.index == 1 ? 'map' : 'map-outline'} pack='ionicons' />
      }
    />
    <BottomNavigationTab
      icon={state.index == 2 ? IconPostNewsPress : IconPostNews}
    />
    <BottomNavigationTab
      title='Thông báo'
      icon={
        <Icon
          name={state.index == 3 ? 'notifications' : 'notifications-outline'}
          pack='ionicons'
        />
      }
    />
    <BottomNavigationTab
      title='Trang cá nhân'
      icon={
        <Icon
          name={state.index == 4 ? 'person' : 'person-outline'}
          pack='ionicons'
        />
      }
    />
  </BottomNavigation>
)
const BottomTab = () => {
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
      <Screen name={HOME_SCREEN} component={HomeStack} />
      <Screen name='Map' component={MapStack} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name='NotifyScreen' component={NotifyStack} />
      <Screen name='Profile' component={ProfileStack} />
    </Navigator>
  )
}
export default BottomTab
