import { Button, Layout } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { useTheme } from 'stores/theme-context'
import { logout } from 'actions/userActions'
import { useDispatch } from 'react-redux'

export const HomeScreen = ({ navigation }) => {
  const { toggleTheme, theme } = useTheme()
  const dispatch = useDispatch()
  const navigateDetails = () => {
    navigation.navigate('Details')
  }
  const toggleMap = () => {
    navigation.navigate('Maps')
  }
  const signOut = () => {
    dispatch(logout())
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
        <Button style={{ marginVertical: 4 }} onPress={toggleMap}>
          MAP
        </Button>
        <Button style={{ marginVertical: 4 }} onPress={signOut}>
          Sign out
        </Button>
      </Layout>
    </SafeAreaView>
  )
}
