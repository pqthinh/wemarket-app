import { Layout, Text, TopNavigation } from '@ui-kitten/components'
import { getNotifies } from 'actions/notifyActions'
import { renderRightActions } from 'components/Header'
import { withArray, withEmpty, withNumber } from 'exp-value'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import NotifyItems from './notifyItems'

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
      {withNumber('listNotify.length', notifiesReducer) ? (
        <Layout>
          <FlatList
            data={withArray('listNotify', notifiesReducer)}
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
