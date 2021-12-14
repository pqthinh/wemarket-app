import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Layout, Avatar, Button, Text } from '@ui-kitten/components'
import NumberFormat from 'react-number-format'

const PostItems = ({ item }) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.Row}>
        <Avatar rounded size='medium' source={{ uri: item.avatar }} />
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.status}>
          {' '}
          {item.status == 'active' ? 'Đã kiểm duyệt' : 'Đang chờ duyệt'}
        </Text>
      </View>
      <View style={styles.Row}>
        <Image source={{ uri: item.image }} style={styles.imageProduct} />
        <View style={styles.infoPost}>
          <Text numberOfLines={1}>{item.name}</Text>
          <Text style={styles.quantity}>{item.quantity} sản phẩm</Text>
          <Text style={styles.price}>
            <NumberFormat
              value={item.price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={formattedValue => <Text>{formattedValue}</Text>}
            />
          </Text>
        </View>
      </View>

      <View style={styles.acceptButton}>
        <Button size='small'>Đánh dấu là đã bán</Button>
      </View>
    </Layout>
  )
}
export default PostItems
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#ECECEC'
  },
  Row: {
    flexDirection: 'row',
    margin: 5
  },
  userName: {
    alignSelf: 'center'
  },
  status: {
    marginLeft: 50,
    alignSelf: 'center',
    color: '#E26740'
  },
  imageProduct: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    flex: 0.3
  },
  infoPost: {
    flex: 0.7
  },
  quantity: {
    alignSelf: 'flex-end',
    margin: 10
  },
  price: {
    alignSelf: 'flex-end',
    margin: 10,
    color: '#E26740'
  },
  acceptButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 10
  }
})
