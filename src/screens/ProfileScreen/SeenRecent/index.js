import React, { useState, useEffect } from 'react'
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { Layout, TopNavigation, Text } from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getSeenRecent } from 'actions/SeenRecentActions'
import ProductItem from 'components/ProductItem'

const SeenRecentScreen = () => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const seenRecentReducer = useSelector(state => {
    return state.listProductSeenRecent
  })
  useEffect(() => {
    dispatch(getSeenRecent(userReducer.userInfo.uid))
  }, [])
  useEffect(() => {
    if (seenRecentReducer.listSeenRecent) {
      console.log(seenRecentReducer.listSeenRecent.length, 'length list')
    }
  }, [seenRecentReducer])

  if (seenRecentReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.spinnerView}>
          <ActivityIndicator size='large' color='#E26740' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {seenRecentReducer.listSeenRecent != [] ? (
        <Layout>
          <FlatList
            data={seenRecentReducer.listSeenRecent}
            numColumns={2}
            //inverted={true}
            renderItem={({ item, key }) => (
              <ProductItem product={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </Layout>
      ) : (
        <Layout>
          <Text category='h4'>Chưa có bài viết nào</Text>
        </Layout>
      )}
    </SafeAreaView>
  )
}
export default SeenRecentScreen
const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})