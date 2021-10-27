import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Feather } from 'react-native-vector-icons'
import SearchComponent from '/component/SearchComponent'
import MapScreen from '/screens/AuthScreens/MapScreen'
import HomeScreen from '/screens/AuthScreens/HomeScreen'
import DetailsScreen from '/screens/AuthScreens/DetailsScreen'

const Stack = createStackNavigator()

export default function HomeStack(props) {
  const { navigation } = props
  const [search, setSearch] = useState('')
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('News', {
                    screen: 'Search',
                    params: { search: search }
                  })
                  setSearch('')
                }}
              >
                <SearchComponent
                  value={search}
                  onChangeData={setSearch}
                  navigation={navigation}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconWrapper}>
                <Feather
                  name='shopping-cart'
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate('Card')
                  }}
                />
                <Feather
                  name='message-circle'
                  size={24}
                  style={styles.IconWrapper}
                  onPress={() => {
                    navigation.navigate('ChatStack', { screen: 'ListContact' })
                  }}
                />
              </View>
            ),
            headerLeft: () => (
              <View style={styles.IconWrapper}>
                <Feather
                  name='menu'
                  size={24}
                  color='#fff'
                  onPress={() => {
                    navigation.openDrawer()
                  }}
                  style={{ marginRight: 0 }}
                />
              </View>
            ),
            headerStyle: {
              backgroundColor: '#aed581'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          }}
        />

        <Stack.Screen
          name='MapScreen'
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DetailsScreen'
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PostNews'
          component={() => {
            return null
          }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  IconWrapper: { flexDirection: 'row', marginHorizontal: 5, color: '#fff' }
})
