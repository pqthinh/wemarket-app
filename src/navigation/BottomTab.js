import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout
} from '@ui-kitten/components'
import React from 'react'
import { useSelector } from 'react-redux'
// import MapSelect from 'screens/MapSelect'
import { HOME_SCREEN } from 'utils/ScreenName'
import PostStack from './PostStack'
import HomeStack from './HomeStack'
import MapStack from './MapStack'
import NotifyStack from './NotifyStack'
import ProfileStack from './ProfileStack'

const { Navigator, Screen } = createBottomTabNavigator()

const IconPostNews = ({ name, tintColor, ...rest }) => {
  return (
    <Layout
      style={{
        position: 'absolute',
        bottom: 0,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: '#fff'
      }}
    >
      <Icon
        {...rest}
        name={name}
        pack='ionicons'
        style={{
          fontSize: 60,
          position: 'absolute',
          top: -2,
          left: 2,
          color: rest.style.tintColor
        }}
      />
    </Layout>
  )
}

const BottomTabBar = ({ navigation, state }) => {
  const settingState = useSelector(state => {
    return state.settingState || {}
  })

  if (settingState.hiddenBottom) return null
  return (
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
          <Icon
            name={state.index == 1 ? 'map' : 'map-outline'}
            pack='ionicons'
          />
        }
      />
      <BottomNavigationTab
        icon={
          <IconPostNews
            name={state.index == 2 ? 'add-circle-outline' : 'add-circle'}
          />
        }
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
}

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
      <Screen name='CreatePost' component={PostStack} />
      <Screen name='NotifyScreen' component={NotifyStack} />
      <Screen name='Profile' component={ProfileStack} />
    </Navigator>
  )
}
export default BottomTab
