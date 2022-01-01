import React, { Component, useEffect, useState, useCallback } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NumberFormat from 'react-number-format'
import ProductItem from 'components/ProductItem'
import {
  Icon,
  Text,
  Avatar,
  Layout,
  Divider,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { getSameProducts } from 'actions/sameProductActions'

const SameProduct = ({ route }) => {
  const { product } = route.params
  const sameProduct = useSelector(state => state.fetchSameProduct)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const renderBackAction = () => (
    <TopNavigationAction
      onPress={() => navigation.goBack()}
      icon={<MaterialIcons name='arrow-back' size={24} color='black' />}
    />
  )
  useEffect(() => {
    sameProduct.listSameProduct = []
    dispatch(getSameProducts(product.productId))
  }, [])
  const handleNavigateToDetail = () => {
    navigation.navigate('DETAIL_PRODUCT', { product: product })
  }
  const HeaderProduct = () => {
    return (
      <View>
        <Layout style={styles.container}>
          <Layout level='3'>
            <TopNavigation
              alignment='center'
              title={() => (
                <Text style={{ fontSize: 20, color: 'black' }}>
                  Sản phẩm tương tự
                </Text>
              )}
              accessoryLeft={renderBackAction}
              style={{
                borderBottomColor: '#F8F8F8',
                borderBottomWidth: 3
              }}
            />
          </Layout>
          <TouchableOpacity
            onPress={handleNavigateToDetail}
            style={{ flex: 7 }}
          >
            <View style={styles.Row}>
              <View style={styles.userInfo}>
                <Avatar
                  rounded
                  size='medium'
                  source={{ uri: product.avatar }}
                />
                <Text style={styles.userName}>{product.username}</Text>
              </View>
            </View>
            <View style={styles.Row}>
              <Image
                source={{ uri: product.image }}
                style={styles.imageProduct}
              />
              <View style={styles.infoPost}>
                <Text style={styles.name} numberOfLines={1}>
                  {product.name}
                </Text>

                <Text style={styles.price}>
                  <NumberFormat
                    value={product.price}
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
        </Layout>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            backgroundColor: '#F2F3F7',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Divider style={styles.divider} />
          <Text category='h6'>Sản phẩm tương tự</Text>
          <Divider style={styles.divider} />
        </View>
        {sameProduct.loading ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size='large' color='#E26740' />
          </View>
        ) : null}
      </View>
    )
  }

  return (
    <FlatList
      data={sameProduct.listSameProduct}
      numColumns={2}
      renderItem={({ item, key }) => (
        <ProductItem
          product={item}
          //   data={dataSource}
          //   setData={setDataSource}
          index={key}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      initialNumToRender={20}
      ListHeaderComponent={HeaderProduct}
      onEndReachedThreshold={0.1}
    />
  )
}

export default SameProduct
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5
  },
  spinnerView: {
    justifyContent: 'center',
    alignItems: 'center'
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
    borderWidth: 0.2,
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 10
  },
  acceptButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    margin: 10
  }
})
