import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
)

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
)

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <Tab title='USERS' />
    <Tab title='ORDERS' />
  </TabBar>
)

export const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='Users' component={UsersScreen} />
    <Screen name='Orders' component={OrdersScreen} />
  </Navigator>
)
