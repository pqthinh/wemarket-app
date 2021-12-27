import React, { useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import { getPostUser } from 'actions/profileActions'
import PostItems from 'components/PostItems'

const PostScreen = ({ user }) => {
  const dispatch = useDispatch()
  const listPostReducer = useSelector(state => {
    return state.manageProfile
  })

  const _renderFooter = useCallback(() => {
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
  }, [])
  useEffect(() => {
    dispatch(
      getPostUser({
        uid: user.uid
        //limit: 10
      })
    )
  }, [user.uid])
  if (listPostReducer.loading) {
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
      {!listPostReducer.listPost ? (
        <Layout style={styles.container}>
          <Text category='h4'>Chưa có bài viết nào</Text>
        </Layout>
      ) : (
        <Layout level='3' style={{ flex: 1 }}>
          <FlatList
            nestedScrollEnabled
            data={listPostReducer.listPost.reverse()}
            renderItem={({ item, key }) => (
              <PostItems item={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={7}
            //onEndReached={handleLoadMorePost}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={0.5}
          />
        </Layout>
      )}
    </Layout>
  )
}
export default PostScreen
const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
