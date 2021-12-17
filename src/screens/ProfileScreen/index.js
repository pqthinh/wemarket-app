import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import { Avatar } from 'react-native-elements'
import PostScreen from './PostScreen'
import Setting from './SettingScreen'
import { useDispatch, useSelector } from 'react-redux'
import {
  Tab,
  TabBar,
  Text,
  Layout,
  Button,
  TopNavigation
} from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
const ProfileScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dispatch = useDispatch()

  const userReducer = useSelector(state => {
    return state.userState
  })
  console.log(userReducer.userInfo)
  const signIn = () => {
    navigation.navigate(SIGN_IN_SCREEN)
  }
  const signUp = () => {
    navigation.navigate(SIGN_UP_SCREEN)
  }

  if (userReducer.userInfo)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Layout level='3'>
            <TopNavigation
              alignment='center'
              //title='Eva Application'
              accessoryRight={renderRightActions}
              style={{ backgroundColor: '#F2F3F7' }}
            />
          </Layout>
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
                    userReducer.userInfo?.avatar ||
                    'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>
                {userReducer.userInfo.username}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16
                }}
              >
                {userReducer.userInfo.email}
              </Text>
            </View>
          </View>

          <TabBar
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={{ height: 40 }}
          >
            <Tab title='Cài đặt' />
            <Tab title='Bài viết' />
          </TabBar>
          {selectedIndex == 0 ? (
            <Setting user={userReducer.userInfo} />
          ) : (
            <PostScreen user={userReducer.userInfo} />
          )}
        </ScrollView>
      </SafeAreaView>
    )
  else
    return (
      <ScrollView>
        <View style={styles.loginRow}>
          <View style={styles.userIcon}>
            <Avatar
              rounded
              size='medium'
              source={{
                uri: 'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
              }}
              onPress={signIn}
            />
          </View>

          <Button size='small' style={styles.buttonLogin} onPress={signIn}>
            Đăng nhập
          </Button>
          <Button size='small' style={styles.buttonLogin} onPress={signUp}>
            Đăng ký
          </Button>
        </View>
        <Setting user={userReducer.userInfo} />
      </ScrollView>
    )
}
export default ProfileScreen
const styles = StyleSheet.create({
  loginRow: {
    flexDirection: 'row'
  },
  buttonLogin: {
    marginRight: 5,
    marginVertical: 5
  },
  userIcon: {
    alignItems: 'flex-start',
    marginLeft: 15,
    marginRight: 120
  },
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
