import {
  Button,
  Layout,
  Tab,
  TabBar,
  Text,
  TopNavigation
} from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
import { withBoolean, withEmpty, withObject } from 'exp-value'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-virtualized-view'
import { useSelector } from 'react-redux'
import { SIGN_IN_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import PostScreen from './PostScreen'
import Setting from './SettingScreen'

const ProfileScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const userReducer = useSelector(state => {
    return state.userState
  })
  const signIn = () => {
    navigation.navigate(SIGN_IN_SCREEN)
  }
  const signUp = () => {
    navigation.navigate(SIGN_UP_SCREEN)
  }

  if (withBoolean('userInfo', userReducer))
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Layout level='3'>
            <TopNavigation
              alignment='center'
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
                  uri: withEmpty('userInfo.avatar', userReducer)
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>
                {withEmpty('userInfo.username', userReducer)}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16
                }}
              >
                {withEmpty('userInfo.email', userReducer)}
              </Text>
            </View>
          </View>

          <TabBar
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={{ height: 40 }}
          >
            <Tab title='Tài khoản' />
            <Tab title='Bài viết' />
          </TabBar>
          {!selectedIndex ? (
            <Setting user={withObject('userInfo', userReducer)} />
          ) : (
            <PostScreen user={withObject('userInfo', userReducer)} />
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
          <View style={styles.button}>
            <Button size='small' style={styles.buttonLogin} onPress={signIn}>
              Đăng nhập
            </Button>
            <Button size='small' style={styles.buttonLogin} onPress={signUp}>
              Đăng ký
            </Button>
          </View>
        </View>
        <Setting user={userReducer.userInfo} />
      </ScrollView>
    )
}
export default ProfileScreen
const styles = StyleSheet.create({
  loginRow: {
    flexDirection: 'row',
    flex: 1
  },
  button: {
    flex: 4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLogin: {
    marginRight: 5,
    marginVertical: 5
  },
  userIcon: {
    alignItems: 'flex-start',
    marginLeft: 15,
    flex: 5
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
