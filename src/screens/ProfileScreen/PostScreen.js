import React, { useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import { getPostUser } from 'actions/profileActions'
import { withArray, withNumber, withBoolean } from 'exp-value'
import PostItems from 'components/PostItems'
const PostScreen = ({ user }) => {
  const [listPost, setListPost] = useState([])
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)
  const listPostReducer = useSelector(state => {
    return state.manageProfile || {}
  })

  // console.log(listPost, 'list post user')
  const handleLoadMorePost = useCallback(() => {
    if (withNumber('listPost.total', listPostReducer) / 10 + 1 <= page) return
    dispatch(getPostUser({ uid: user.uid, limit: 10, offset: page - 1 }))
  }, [page, dispatch, listPostReducer])

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
        {loadingLoadMore ? (
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        ) : null}
      </View>
    )
  }, [loadingLoadMore])
  useEffect(() => {
    dispatch(
      getPostUser({
        uid: user.uid
        //limit: 10
      })
    )
  }, [user.uid])
  useEffect(() => {
    if (listPostReducer.listPost.result) {
      // const loadListPost = withArray('listPost.result', listPostReducer)
      // setLoadingLoadMore(withBoolean('loading', listPostReducer))
      setListPost(withArray('listPost.result', listPostReducer))
      // if (loadListPost.length > 0) {
      //   console.log(1, listPost.length, loadListPost.length)
      //   setListPost([...listPost, ...loadListPost])
      //   setPage(page + 1)
      // }
    }
  }, [listPostReducer])
  if (loadingLoadMore) {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    )
  } else {
    return (
      <Layout>
        {listPost == [] ? (
          <Layout style={styles.container}>
            <Text category='h4'>Chưa có bài viết nào</Text>
          </Layout>
        ) : (
          <Layout level='3' style={{ flex: 1 }}>
            <FlatList
              nestedScrollEnabled
              data={listPost}
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
}
export default PostScreen
const styles = StyleSheet.create({
  spinnerView: {
    top: '150%',
    left: '50%',

    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute'
  }
})
