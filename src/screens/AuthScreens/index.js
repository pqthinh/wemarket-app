import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HomeScreen } from './HomeScreen'
import { DetailsScreen } from './DetailsScreen'
import { MapScreen } from './MapScreen'
import { TabNavigator } from 'tab'
import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { View, Text } from 'react-native'
import Map from './Map/index'

import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'
import MapSelect from './MapSelect/index'

const { Navigator, Screen } = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthScreens() {
  return (
    <Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Screen name={HOME_SCREEN} component={HomeScreen} />
      <Screen name='Details' component={DetailsScreen} />
      <Screen name='Map' component={Map} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name={CHAT_SCREEN} component={TabNavigator} />
      <Screen name='Maps' component={MapScreen} />
    </Navigator>
  )
}

const IconPostNews = ({ color }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: -10,
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0'
      }}
    >
      <MaterialCommunityIcons
        name='dolly'
        color={color || '#000'}
        size={50}
        style={{ flex: 1, alignItems: 'center' }}
      />
    </View>
  )
}

function Test() {
  return <Text>Test</Text>
}

export default function BottomTab(props) {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      appearance='noIndicator'
      tabBarOptions={{
        activeTintColor: '#E26740'
      }}
    >
      <Tab.Screen
        name='Home'
        component={AuthScreens}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name='Notify'
        component={MapScreen}
        options={{
          tabBarLabel: 'Bản đồ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={26} />
          ),
          tabBarBadge: 3
        }}
      />
      <Tab.Screen
        name='Post'
        component={Test}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <IconPostNews color={color} />
        }}
      />
      <Tab.Screen
        name='Card'
        component={Test}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='shopping' color={color} size={26} />
          ),
          tabBarBadge: 3
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Test}
        options={{
          tabBarLabel: 'Trang cá nhân',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
