import { Avatar, Divider, Text } from '@ui-kitten/components'
import { deleteNotify, updateNotify } from 'actions/notifyActions'
import { withEmpty } from 'exp-value'
import moment from 'moment'
import React, { useCallback, useRef } from 'react'
import { Animated, I18nManager, Image, StyleSheet, View } from 'react-native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useDispatch, useSelector } from 'react-redux'
const image = require('images/logo.png')

const NotifyItems = ({ item }) => {
  const updateRef = useRef(Swipeable)
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })

  const handlePressUpdate = useCallback(
    (uid, id) => {
      dispatch(updateNotify({ uid: uid, idNotify: id }))
    },
    [dispatch]
  )

  const handlePressDelete = useCallback(
    (uid, id) => {
      dispatch(deleteNotify({ uid: uid, id: id }))
    },
    [dispatch]
  )

  const renderRightActions = (progress, _dragAnimatedValue) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
      extrapolate: 'clamp'
    })
    return (
      <View
        style={{
          width: 64,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
        }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateX: scale }] }}>
          <RectButton
            style={styles.rightAction}
            onPress={() =>
              handlePressDelete(withEmpty('userInfo.uid', userReducer), item.id)
            }
          >
            {/* Change it to some icons */}
            <Text style={styles.actionText}>Xoá</Text>
          </RectButton>
        </Animated.View>
      </View>
    )
  }
  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      rightThreshold={40}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      <TouchableOpacity
        style={item.isRead == 1 ? styles.container : styles.container_2}
        onPress={() => {
          !item.isRead
            ? handlePressUpdate(withEmpty('userInfo.uid', userReducer), item.id)
            : null
        }}
      >
        <View style={styles.Row}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size='medium'
              source={item.code == 2 ? { uri: item.avatar } : image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            {item.code == 2 ? (
              <Text>
                <Text style={{ fontWeight: 'bold' }}>{item.username}</Text> đã
                bình luận bài viết của bạn: " {item.content} "
              </Text>
            ) : (
              <Text>{item.content}</Text>
            )}
            <Text style={styles.time}>
              {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </Text>
          </View>

          <Image source={{ uri: item.image }} style={styles.imageProduct} />
        </View>

        <Divider style={styles.divider} />
      </TouchableOpacity>
    </Swipeable>
  )
}
export default NotifyItems
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container_2: {
    flex: 1,
    backgroundColor: '#FDECD9'
  },
  avatar: {
    flex: 2
  },
  content: {
    flex: 6
  },
  imageProduct: {
    width: 50,
    height: '90%',
    resizeMode: 'cover',
    flex: 2,
    margin: 10,
    borderRadius: 10,
    paddingVertical: 20,
    marginBottom: 20
  },
  Row: {
    flexDirection: 'row',
    margin: 5
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 17
  },
  userName: {
    alignSelf: 'center'
  },
  time: {
    fontSize: 11,
    marginTop: 5
  },
  divider: {
    marginLeft: 10,
    height: 1.5
  },

  rightAction: {
    alignItems: 'center',

    backgroundColor: '#EB5757',
    flex: 1,
    justifyContent: 'center',
    width: 64
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  }
})
