import { Button, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import { useTheme } from 'stores/theme-context'
import { logout } from 'actions/userActions'
import { useDispatch } from 'react-redux'
import { firebase } from 'configs/firebaseConfig'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const signOut = () => {
    dispatch(logout())
  }
  const logIn = () => {
    navigation.navigate(SIGN_IN_SCREEN)
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setUser(null)
      } else {
        setUser(user)
      }
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout>
        {user ? (
          <Button style={{ marginVertical: 4 }} onPress={signOut}>
            Sign out
          </Button>
        ) : (
          <Button style={{ marginVertical: 4 }} onPress={logIn}>
            Log in
          </Button>
        )}
      </Layout>
    </SafeAreaView>
  )
}
export default ProfileScreen
