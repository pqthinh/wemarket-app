import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import ListChat from 'screens/ChatScreen/ListChat'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
const Stack = createStackNavigator()

const ChatStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='List Chat'>
      <Stack.Screen
        name='List Chat'
        component={ListChat}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Chat'
        }}
      />
      <Stack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          headerShown: true,
          title: route.params.name
        })}
      />
    </Stack.Navigator>
  )
}
export default ChatStack
