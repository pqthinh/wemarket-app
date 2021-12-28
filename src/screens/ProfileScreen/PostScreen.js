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
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState([])
  const [offset, setOffset] = useState(1)
  const handleLoadMore = useCallback(() => {
    dispatch(getPostUser(user.uid, offset))
    setOffset(offset + 1)
    //After the response increasing the offset for the next API call.
    setDataSource([...dataSource, ...listPostReducer.listPost])
    setLoading(false)
  }, [listPostReducer.listPost, offset])
  const _renderFooter = () => {
    if (loading) {
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
      getPostUser({
        uid: user.uid,
        offset: 0
      })
    )
    setDataSource(listPostReducer.listPost)
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
            data={dataSource.reverse()}
            renderItem={({ item, key }) => (
              <PostItems item={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={7}
            //onEndReached={handleLoadMorePost}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={0.5}
            enableEmptySections={true}
            onEndReached={handleLoadMore}
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
