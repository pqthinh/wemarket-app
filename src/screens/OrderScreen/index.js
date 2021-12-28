import React, { useEffect, useState, useCallback } from 'react'
import {
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
  const _renderFooter = () => {
    if (hasScrolled) {
      return (
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1
          }}
        >
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        </View>
      )
    } else return null
  }
  useEffect(() => {
    dispatch(
      getOrderBuyer({
        uid: userReducer.userInfo.uid
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
        <View style={styles.spinnerView}>
          <ActivityIndicator size='large' color='#E26740' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <Layout>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          title={() => (
            <Text style={{ fontSize: 20, color: 'black' }}>Giỏ hàng</Text>
          )}
          accessoryRight={() => renderRightActions(false)}
          accessoryLeft={renderBackAction}
          style={{ backgroundColor: '#F2F3F7' }}
        />
      </Layout>
      {!listOrderReducer.listOrder ? (
        <Layout style={styles.container}>
          <Text category='h4'>Chưa có bài viết nào</Text>
        </Layout>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={listOrderReducer.listOrder}
          renderItem={({ item, key }) => <OrderItems item={item} index={key} />}
          keyExtractor={(_, index) => index.toString()}
          initialNumToRender={7}
          //onEndReached={handleLoadMorePost}
          //ListFooterComponent={_renderFooter}
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
  }
})
