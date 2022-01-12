import { useNavigation } from '@react-navigation/native'
import { Button } from '@ui-kitten/components'
import { logout } from 'actions/userActions'
import Chevron from 'components/IconProfile/Chevron'
import BaseIcon from 'components/IconProfile/Icon'
import InfoText from 'components/IconProfile/InfoText'
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Switch, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'

const Setting = ({ user }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [pushNotifications, setPushNotifications] = useState(true)

  const onChangePushNotifications = () => {
    setPushNotifications(!pushNotifications)
  }
  const logOut = useCallback(() => dispatch(logout()), [dispatch])
  const signIn = () => {
    navigation.navigate(SIGN_IN_SCREEN)
  }
  const handleBookmark = () => {
    navigation.navigate('Bookmark Screen')
  }
  const handleSeenRecent = () => {
    navigation.navigate('SeenRecent Screen')
  }
  return (
    <ScrollView style={styles.scroll}>
      <InfoText text='Mua hàng' />
      <View>
        <ListItem
          onPress={user ? handleBookmark : signIn}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: '#F6B48C' }}
            icon={{
              type: 'ionicon',
              name: 'bookmark-outline'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Đã lưu</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>
        <ListItem
          onPress={user ? handleSeenRecent : signIn}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: '#75BCFF' }}
            icon={{
              type: 'ionicon',
              name: 'time-outline'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Đã xem gần đây</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>
      </View>
      <InfoText text='Cài đặt' />
      <View>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{
              backgroundColor: '#FFADF2'
            }}
            icon={{
              type: 'material',
              name: 'notifications'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Thông báo</ListItem.Title>
          </ListItem.Content>
          <Switch
            onValueChange={onChangePushNotifications}
            value={pushNotifications}
          />
        </ListItem>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#F6B48C' }}
            icon={{
              type: 'material-community',
              name: 'theme-light-dark'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Thay đổi giao diện</ListItem.Title>
          </ListItem.Content>
          <ListItem.Title style={{ fontSize: 15 }}>Sáng</ListItem.Title>
          <Chevron />
        </ListItem>

        <ListItem
          onPress={
            user ? () => navigation.navigate('Sửa trang cá nhân') : signIn
          }
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: '#A4C8F0' }}
            icon={{
              type: 'font-awesome',
              name: 'user-o'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Thiết lập tài khoản</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem
          //   onPress={() => this.onPressSetting()}
          containerStyle={styles.listItemContainer}
        >
          <BaseIcon
            containerStyle={{ backgroundColor: '#FEA8A1' }}
            icon={{
              type: 'material',
              name: 'language'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Ngôn ngữ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Title style={{ fontSize: 15 }}>Tiếng Việt</ListItem.Title>
          <Chevron />
        </ListItem>
      </View>
      <InfoText text='Xem thêm' />
      <View>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#A4C8F0' }}
            icon={{
              type: 'ionicon',
              name: 'information-circle'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Giới thiệu</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#C6C7C6' }}
            icon={{
              type: 'entypo',
              name: 'light-bulb'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Điều khoản và chính sách</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#C47EFF' }}
            icon={{
              type: 'entypo',
              name: 'share'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Chia sẻ ngay!</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#FECE44' }}
            icon={{
              type: 'entypo',
              name: 'star'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Đánh giá ngay!</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            containerStyle={{ backgroundColor: '#00C001' }}
            icon={{
              type: 'materialicon',
              name: 'feedback'
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Gửi phản hồi</ListItem.Title>
          </ListItem.Content>
          <Chevron />
        </ListItem>
      </View>

      {user && (
        <Button onPress={logOut} style={styles.logoutButton}>
          Đăng xuất
        </Button>
      )}
    </ScrollView>
  )
}

export default Setting

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white'
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
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC'
  },
  logoutButton: {
    margin: 20
  }
})
