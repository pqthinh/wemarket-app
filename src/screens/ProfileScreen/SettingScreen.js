import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import BaseIcon from 'components/IconProfile/Icon'
import Chevron from 'components/IconProfile/Chevron'
import InfoText from 'components/IconProfile/InfoText'
import { Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
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

const Setting = () => {
  const navigation = useNavigation()
  const [userDetails, setUserDetails] = useState({})
  const [pushNotifications, setPushNotifications] = useState(true)
  // useEffect(()=>{
  //   fetchUserDetails()
  // })

  // onPressSetting = () => {
  //   this.props.navigation.navigate('Options')
  // }

  const onChangePushNotifications = () => {
    setPushNotifications(!pushNotifications)
  }
  //    const  fetchUserDetails = async () => {
  //       try {
  //         const userDetails = await Api.getUserDetails()
  //         setUserDetails(userDetails)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   const { avatar, name, email } = userDetails
  return (
    <ScrollView style={styles.scroll}>
      <InfoText text='Account' />
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
          onPress={() => navigation.navigate('Sửa trang cá nhân')}
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
      <InfoText text='More' />
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

      <Button style={styles.logoutButton}>Đăng xuất</Button>
    </ScrollView>
  )
}

export default Setting
