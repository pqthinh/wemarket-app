import React, { useEffect, useState, useCallback } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { renderRightActions } from 'components/Header'
import { getOrderBuyer } from 'actions/orderActions'
import OrderItems from './OrderItem'
import { withEmpty } from 'exp-value'

const OrderScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const listOrderReducer = useSelector(state => {
    return state.manageOrder
  })
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    dispatch(
      getOrderBuyer({
        uid: withEmpty('userInfo.uid', userReducer)
      })
    )
  }, [userReducer])
  const onScroll = () => {
    setHasScrolled(true)
  }
  const renderBackAction = () => (
    <TopNavigationAction
      onPress={() => navigation.goBack()}
      icon={<MaterialIcons name='arrow-back' size={24} color='black' />}
    />
  )
  if (listOrderReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout level='3'>
          <TopNavigation
            alignment='center'
            title={() => (
              <Text style={{ fontSize: 20, color: 'black' }}>Giỏ hàng</Text>
            )}
            accessoryRight={() => renderRightActions(false)}
            accessoryLeft={renderBackAction}
            style={{
              borderBottomColor: '#F8F8F8',
              borderBottomWidth: 3
            }}
          />
        </Layout>
        <View style={styles.spinnerView}>
          <ActivityIndicator size='large' color='#E26740' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          title={() => (
            <Text style={{ fontSize: 20, color: 'black' }}>Giỏ hàng</Text>
          )}
          accessoryRight={() => renderRightActions(false)}
          accessoryLeft={renderBackAction}
          style={{
            borderBottomColor: '#F8F8F8',
            borderBottomWidth: 3
          }}
        />
      </Layout>
      {listOrderReducer.listOrder == [] ? (
        <Layout style={styles.container}>
          <Image source={require('images/no-post.jpg')} style={styles.image} />
          <Text category='h6' style={styles.text}>
            Giỏ hàng của bạn còn trống
          </Text>
        </Layout>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={listOrderReducer.listOrder}
          renderItem={({ item, key }) => <OrderItems item={item} index={key} />}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={7}
          onEndReachedThreshold={0.5}
          onScroll={onScroll}
        />
      )}
    </Layout>
  )
}
export default OrderScreen
const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').height / 5,
    resizeMode: 'contain'
  },
  text: {
    textAlign: 'center'
    // marginBottom: 100
  }
})
