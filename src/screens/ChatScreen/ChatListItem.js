import { useNavigation } from '@react-navigation/native'
import { Text } from '@ui-kitten/components'
import moment from 'moment'

import React, { useRef } from 'react'
import {
  Alert,
  Animated,
  Image,
  I18nManager,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const ChatListItem = ({ chatRoom }) => {
  const navigation = useNavigation()
  const updateRef = useRef(Swipeable)
  let type = chatRoom?.type
  let authorName = chatRoom?.author == chatRoom.with ? chatRoom?.title : 'Bạn'

  const onClick = () => {
    navigation.navigate('Chat', {
      id: chatRoom.chatId,
      name: chatRoom.title
    })
  }

  if (!chatRoom?.with) {
    return null
  }

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
            onPress={() => {
              Alert.alert(
                'Alert',
                'Are you sure you want to delete ?',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      console.log('delete')
                    },
                    style: 'destructive'
                  }
                ],
                { cancelable: true }
              )
            }}
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
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor='#DDDDDD'
        onPress={onClick}
      >
        <View style={styles.container}>
          <View style={styles.lefContainer}>
            <Image source={{ uri: chatRoom?.image }} style={styles.avatar} />

            <View style={styles.midContainer}>
              <Text style={styles.username}>{chatRoom?.title}</Text>
              <Text numberOfLines={2} style={styles.lastMessage}>
                {(() => {
                  if (type == 'photo') {
                    return `${authorName} sent a photo`
                  } else if (type == 'text') {
                    return `${authorName}: ${chatRoom?.lastMessage}`
                  }
                })()}
              </Text>
            </View>
          </View>

          <Text style={styles.time}>
            {chatRoom.lastMessageDate
              ? moment(chatRoom.lastMessageDate).fromNow()
              : null}
          </Text>
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

export default ChatListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 22
  },
  lefContainer: {
    flexDirection: 'row'
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey'
  },
  time: {
    fontSize: 14,
    color: 'grey'
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
