import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Layout, Avatar, Button, Text, Divider } from '@ui-kitten/components'
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
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.quantity}>{item.quantity} sản phẩm</Text>
          <Text style={styles.price}>
            <NumberFormat
              value={item.price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' đ'}
              renderText={formattedValue => (
                <Text style={{ color: '#E26740' }}>{formattedValue}</Text>
              )}
            />
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />
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
    marginVertical: 5
  },
  Row: {
    flexDirection: 'row',
    margin: 5
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5
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
    resizeMode: 'cover',
    flex: 0.3,
    marginLeft: 5
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
    margin: 10
  },
  divider: {
    marginHorizontal: 10,
    height: 1.5
  },
  acceptButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 10
  }
})
