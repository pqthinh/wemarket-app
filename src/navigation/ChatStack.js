import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListChat from 'screens/ChatScreen/ListChat'
import ChatScreen from 'screens/ChatScreen/ChatScreen'
import { TouchableOpacity } from 'react-native'
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
