import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HomeStack from './HomeStack'
import { DetailsScreen } from 'screens/DetailsScreen'
import Map from 'screens/MapScreen'
import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import MapSelect from 'screens/MapSelect'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text
} from '@ui-kitten/components'
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
        //justifyContent: 'center',
        //alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#F2F3F7'
      }
    ]}
    pack='material'
  />
)

function Test() {
  return <Text>Test</Text>
}
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
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
      appearance='noIndicator'
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
      <Screen name='Map' component={Map} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name='Card' component={Test} />
      <Screen name='Profile' component={Test} />
    </Navigator>
  )
}
