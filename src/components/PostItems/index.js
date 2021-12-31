import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Divider,
  Layout,
  MenuItem,
  OverflowMenu,
  Text
} from '@ui-kitten/components'
import { DELETE_PRODUCT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import NumberFormat from 'react-number-format'
import ImageComponent from '../Image'

const PostItems = ({ item, data, setData }) => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const EditIcon = props => (
    <AntDesign {...props} name='edit' color='black' size={20} />
  )

  const DeleteIcon = props => (
    <AntDesign {...props} name='delete' color='black' size={20} />
  )
  const onPressDelete = async () => {
    try {
      console.log(item.id, 'id')
      const res = await axios.post(DELETE_PRODUCT, { idProduct: item.id })

      if (res && res.data.status) {
        setData(
          data.filter(eachProduct => {
            return eachProduct.id != item.id
          })
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleNavigateToDetail = () => {
    navigation.navigate('DETAIL_PRODUCT', { product: item })
  }
  return (
    <Layout style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToDetail}>
        <View style={styles.Row}>
          <Text style={styles.status}>
            {item.status == 'active' ? 'Đã kiểm duyệt' : 'Đang chờ duyệt'}
          </Text>
          <TouchableOpacity style={styles.options} onPress={toggleMenu}>
            <OverflowMenu
              anchor={() => (
                <SimpleLineIcons name='options' size={20} color='black' />
              )}
              visible={menuVisible}
              onBackdropPress={toggleMenu}
            >
              {item.status == 'pending' && (
                <MenuItem accessoryLeft={EditIcon} title='Sửa' />
              )}

              <MenuItem
                accessoryLeft={DeleteIcon}
                title='Xóa'
                onPress={() => {
                  onPressDelete()
                  toggleMenu()
                }}
              />
            </OverflowMenu>
          </TouchableOpacity>
        </View>
        <View style={styles.Row}>
          <ImageComponent
            source={{ uri: item.image }}
            style={styles.imageProduct}
          />
          <View style={styles.infoPost}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.quantity}>{item?.quantity} sản phẩm</Text>
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
    margin: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  name: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'right'
  },
  userName: {
    alignSelf: 'center'
  },
  status: {
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
    borderRadius: 10,
    marginHorizontal: 5,
    resizeMode: 'cover',
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
