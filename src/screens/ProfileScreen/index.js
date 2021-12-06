import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import { Avatar } from 'react-native-elements'
import { useTheme } from 'stores/theme-context'
import { logout } from 'actions/userActions'
import { useDispatch } from 'react-redux'
import { firebase } from 'configs/firebaseConfig'
import PostScreen from './PostScreen'
import Setting from './SettingScreen'
import { Tab, TabBar, TabView, Text, Layout } from '@ui-kitten/components'
import MaterialTabs from 'react-native-material-tabs'

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
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
      {/* <Layout>
        {user ? (
          <Button style={{ marginVertical: 4 }} onPress={signOut}>
            Sign out
          </Button>
        ) : (
          <Button style={{ marginVertical: 4 }} onPress={logIn}>
            Log in
          </Button>
        )}
      </Layout> */}
      {/* {user && ( */}
      <View
        style={styles.userRow}
        onStartShouldSetResponder={() =>
          navigation.navigate('Sửa trang cá nhân')
        }
      >
        <View style={styles.userImage}>
          <Avatar
            rounded
            size='large'
            source={{
              uri:
                user?.photoURL ||
                'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>
            {user?.displayName || 'Người dùng'}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 16
            }}
          >
            {user?.email || 'test@gmail.com'}
          </Text>
        </View>
      </View>

      {/* <MaterialTabs
        items={['Cài đặt', 'Bài viết']}
        selectedIndex={selectedTab}
        onChange={setSelectedTab}
        barColor='white'
        // textStyle={{ color: 'gray' }}
        indicatorColor='#E26740'
        inactiveTextColor='gray'
        activeTextColor='#E26740'
      /> */}
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={{ height: 40 }}
      >
        <Tab title='Cài đặt'>{/* <Setting /> */}</Tab>
        <Tab title='Bài viết'>{/* <PostScreen /> */}</Tab>
      </TabBar>
      {selectedIndex == 0 ? <Setting /> : <PostScreen />}
    </SafeAreaView>
  )
}
export default ProfileScreen
const styles = StyleSheet.create({
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6
  },
  userImage: {
    marginRight: 12
  }
})
