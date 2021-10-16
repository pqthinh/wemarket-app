import { Button, Layout } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useTheme } from 'stores/theme-context'
import { useLoading } from 'stores/loading-context'
import { firebase } from 'configs/firebaseConfig'

export const HomeScreen = ({ navigation }) => {
  const { toggleTheme, theme } = useTheme()
  const { show, hide } = useLoading()
  const navigateDetails = () => {
    navigation.navigate('Details')
  }
 const toggleMap = () => {
   navigation.navigate('Map')
 }
  const signOut = () => {
    show()
    firebase
      .auth()
      .signOut()
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
    hide()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>{theme}</Text>
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
          OPEN DETAILS
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={toggleTheme}>
          TOGGLE THEME
        </Button>
        <Button
          style={{ marginVertical: 4 }}
          onPress={() => navigation.navigate('Maps')}
        >
          MAPS
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={signOut}>
          Sign out
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={toggleMap}>
          Map
        </Button>
      </Layout>
    </SafeAreaView>
  )
}
