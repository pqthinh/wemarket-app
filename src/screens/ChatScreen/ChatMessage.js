import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, Button } from 'react-native'
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
              <Text style={styles.message}>
                {message.body} {'   '}{' '}
                <Text style={{ fontSize: 12 }}>
                  {moment(message.date).fromNow()}
                </Text>
              </Text>
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
    maxWidth: Dimensions.get('window').width / 2 + 10
  },
  messageBox: {
    borderRadius: 20
  },
  name: {
    color: '#0C6157',
    fontWeight: 'bold',
    marginBottom: 5
  },
  message: { padding: 10, fontSize: 16, fontWeight: 'bold' },
  image: {
    width: Dimensions.get('window').width / 2 + 10,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 30
  },
  time: {
    fontSize: 12,
    position: 'absolute',
    bottom: 5,
    right: 5
  }
})
