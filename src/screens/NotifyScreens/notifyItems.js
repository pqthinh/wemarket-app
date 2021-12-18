import React from 'react'
import { Avatar, Layout, Text, Divider } from '@ui-kitten/components'
import { FlatList, View, StyleSheet, Image } from 'react-native'
const image = require('images/logo.png')

const NotifyItems = ({ item }) => {
  return (
    <Layout style={item.isRead == 1 ? styles.container : styles.container_2}>
      <View style={styles.Row}>
        <View style={styles.avatar}>
          <Avatar
            rounded
            size='medium'
            source={item.code == 1 ? { uri: item.avatar } : image}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          {item.code == 1 ? (
            <Text>
              {item.username} đã bình luận bài viết của bạn: " {item.content} "
            </Text>
          ) : (
            <Text>{item.content}</Text>
          )}
          <Text style={styles.time}>{item.creatAt}</Text>
        </View>

        <Image source={{ uri: item.image }} style={styles.imageProduct} />
      </View>

      <Divider style={styles.divider} />
    </Layout>
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
    height: 50,
    resizeMode: 'cover',
    flex: 2
  },
  Row: {
    flexDirection: 'row',
    margin: 5
  },
  title: {
    fontWeight: 'bold',

    marginTop: 5
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
  }
})
