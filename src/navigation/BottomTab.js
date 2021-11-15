import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeStack from './HomeStack'
import { DetailsScreen } from 'screens/DetailsScreen'
import StackMap from 'screens/MapScreen'
import { HOME_SCREEN, CHAT_SCREEN } from 'utils/ScreenName'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import MapSelect from 'screens/MapSelect'

const { Navigator, Screen } = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthScreens() {
  return (
    <Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false
      })}
    >
      <Screen name={HOME_SCREEN} component={HomeStack} />
      <Screen name='Details' component={DetailsScreen} />
      <Screen name='Map' component={MapSelect} />
      <Screen name='MapSelect' component={MapSelect} />
      <Screen name='Maps' component={StackMap} />
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
        backgroundColor: '#F2F3F7'
      }}
    >
      <MaterialCommunityIcons
        name='dolly'
        color='#E26740'
        size={50}
        style={{ flex: 1, alignItems: 'center' }}
      />
    </View>
  )
}

function Test() {
  return <Text>Test</Text>
}

export default function BottomTab({}) {
  return (
    <Tab.Navigator
      initialRouteName='Home'
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
        name='Map'
        component={StackMap}
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
          tabBarLabel: 'Đăng bài',
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
