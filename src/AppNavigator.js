import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon
} from '@ui-kitten/components'

const { Navigator, Screen } = createBottomTabNavigator()

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h3'>USERS</Text>
  </Layout>
)

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h4'>ORDERS</Text>
  </Layout>
)

const MapsScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h4'>MapsScreen</Text>
  </Layout>
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='home' icon={<Icon name='home-outline' />} />
    <BottomNavigationTab title='orders' icon={<Icon name='gift-outline' />} />
    <BottomNavigationTab title='maps' icon={<Icon name='map-outline' />} />
  </BottomNavigation>
)

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={UsersScreen} />
    <Screen name='Orders' component={OrdersScreen} />
    <Screen name='Maps' component={MapsScreen} />
  </Navigator>
)

export const AppNavigator = () => <TabNavigator />
