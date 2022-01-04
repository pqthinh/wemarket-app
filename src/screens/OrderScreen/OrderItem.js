import { useNavigation } from '@react-navigation/native'
import {
  Avatar,
  Divider,
  Layout,
  MenuItem,
  OverflowMenu,
  Text
} from '@ui-kitten/components'
import { deleteOrder } from 'actions/orderActions'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'

const OrderItems = ({ item }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userState = useSelector(state => state.userState.userInfo)
  const [menuVisible, setMenuVisible] = useState(false)
  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const EditIcon = props => (
    <AntDesign {...props} name='hearto' color='black' size={20} />
  )
  if (item.product_id) {
    item = { ...item, productId: item.product_id }
  }

  const DeleteIcon = props => (
    <AntDesign {...props} name='delete' color='black' size={20} />
  )
  const onPressDelete = useCallback(
    id => {
      dispatch(deleteOrder({ idOrder: id, uid: userState.uid }))
    },
    [dispatch]
  )
  const handleNavigateToDetail = () => {
    navigation.navigate('DETAIL_PRODUCT', { product: item })
  }
  const handleNavigateToSameProduct = () => {
    navigation.navigate('SameProductScreen', { product: item })
  }
  return (
    <Layout style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToDetail}>
        <View style={styles.Row}>
          <View style={styles.userInfo}>
            <Avatar rounded size='medium' source={{ uri: item.sellerAvatar }} />
            <Text style={styles.userName}>{item.sellerUsername}</Text>
          </View>

          <TouchableOpacity style={styles.options} onPress={toggleMenu}>
            <OverflowMenu
              anchor={() => (
                <SimpleLineIcons name='options' size={20} color='black' />
              )}
              visible={menuVisible}
              onBackdropPress={toggleMenu}
            >
              <MenuItem
                accessoryLeft={DeleteIcon}
                title='Xóa'
                onPress={() => {
                  onPressDelete(item.id)
                  toggleMenu()
                }}
              />
              <MenuItem
                accessoryLeft={EditIcon}
                title='Sản phẩm tương tự'
                onPress={() => {
                  handleNavigateToSameProduct()
                  toggleMenu()
                }}
              />

              {/* <MenuItem title='Điện tử' /> */}
            </OverflowMenu>
          </TouchableOpacity>
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
      </TouchableOpacity>
      <Divider style={styles.divider} />
    </Layout>
  )
}
export default OrderItems
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5
  },
  Row: {
    flexDirection: 'row',
    margin: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5
  },
  userName: {
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  userInfo: {
    flexDirection: 'row',
    marginLeft: 10,
    alignSelf: 'center',
    color: '#E26740',
    flex: 9
  },
  options: {
    flex: 1
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
    alignSelf: 'flex-start',
    margin: 10
  },
  price: {
    alignSelf: 'flex-start',
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
