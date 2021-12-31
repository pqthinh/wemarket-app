import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  Image,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ImageStore
} from 'react-native'
import { Layout, TopNavigation, Text } from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
import NotifyItems from './notifyItems'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifies, updateNotify, deleteNotify } from 'actions/notifyActions'
import { withEmpty } from 'exp-value'

const NotifyScreen = () => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const notifiesReducer = useSelector(state => {
    return state.manageNotifies
  })
  useEffect(() => {
    dispatch(getNotifies(withEmpty('userInfo.uid', userReducer)))
  }, [])
  useEffect(() => {
    if (notifiesReducer.listNotify) {
      console.log(notifiesReducer.listNotify, 'list')
    }
  }, [notifiesReducer])

  if (notifiesReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout level='3'>
          <TopNavigation
            alignment='center'
            title={() => (
              <Text style={{ fontSize: 20, color: 'black' }}>Thông báo</Text>
            )}
            accessoryRight={renderRightActions}
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
    <SafeAreaView style={{ flex: 1 }}>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          title={() => (
            <Text style={{ fontSize: 20, color: 'black' }}>Thông báo</Text>
          )}
          accessoryRight={renderRightActions}
          style={{
            borderBottomColor: '#F8F8F8',
            borderBottomWidth: 3
          }}
        />
      </Layout>
      {notifiesReducer.listNotify.length ? (
        <Layout>
          <FlatList
            data={notifiesReducer.listNotify}
            inverted={true}
            renderItem={({ item, key }) => (
              <NotifyItems item={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </Layout>
      ) : (
        <Layout
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
        >
          <Image
            source={require('images/no-notify.png')}
            style={styles.imageNotify}
          />
          <Text category='h6'>Chưa có thông báo</Text>
        </Layout>
      )}
    </SafeAreaView>
  )
}
export default NotifyScreen
const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageNotify: {
    width: Dimensions.get('screen').width / 2,
    height: Dimensions.get('screen').height / 7,
    resizeMode: 'contain'
  },
  textNotify: {
    textAlign: 'center',
    marginBottom: 100
  }
})
