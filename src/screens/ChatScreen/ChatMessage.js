import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import moment from 'moment'

const ChatMessage = props => {
  const { message, myId } = props
  const isMyMessage = () => {
    return message.author === myId
  }

  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
        }
      ]}
    >
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : '#ccc'
          }
        ]}
      >
        {(() => {
          if (message.type === 'text' || message.type === 'document') {
            return (
              <View style={styles.message}>
                <Text style={styles.message}>{message.body}</Text>
                <Text style={[styles.time, { position: 'relative' }]}>
                  {moment(message.date).fromNow()}
                </Text>
              </View>
            )
          } else if (message.type === 'photo') {
            return (
              <View>
                <Image source={{ uri: message.body }} style={styles.image} />
                <Text style={styles.time}>
                  {moment(message.date).fromNow()}
                </Text>
              </View>
            )
          }
        })()}
      </View>
    </View>
  )
}

export default ChatMessage
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxWidth: Dimensions.get('window').width / 2 + 20,
    marginHorizontal: 10
  },
  messageBox: {
    borderRadius: 10
  },
  name: {
    color: '#0C6157',
    fontWeight: 'bold',
    marginBottom: 5
  },
  message: { padding: 5, fontSize: 16, fontWeight: 'bold' },
  image: {
    width: Dimensions.get('window').width / 2 + 20,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10
  },
  time: {
    fontSize: 12,
    position: 'absolute',
    marginHorizontal: 10,
    bottom: 5,
    right: 5
  }
})
