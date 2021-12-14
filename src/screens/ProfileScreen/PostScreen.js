import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import { getPostUser } from 'actions/profileActions'
import { withArray, withNumber } from 'exp-value'
import PostItems from 'components/PostItems'
const PostScreen = ({ user }) => {
  const [listPost, setListPost] = useState([])
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const listPostReducer = useSelector(state => {
    return state.manageProfile
  })
  useEffect(() => {
    if (listPostReducer.listPost) {
      //const loadListPost = withArray('listPost.result', listPostReducer)
      setListPost(withArray('listPost.result', listPostReducer))
      // if (loadListPost.length > 0) {
      //   setListPost([...listPost, ...loadListPost])
      //   setPage(page + 1)
      // }
    }
  }, [listPostReducer])
  useEffect(() => {
    dispatch(
      getPostUser({
        uid: user.uid
      })
    )
  }, [user.uid])
  // console.log(listPost, 'list post user')
  // const handleLoadMorePost = useCallback(() => {
  //   if (withNumber('listPost.result', listPostReducer) / 10 + 1 <= page)
  //     return dispatch(getPostUser({ offset: page - 1 }))
  // }, [page, dispatch, listPostReducer])

  return (
    <Layout>
      {listPost == [] ? (
        <Layout style={styles.container}>
          <Text category='h4'>Chưa có bài viết nào</Text>
        </Layout>
      ) : (
        <Layout level='3'>
          <FlatList
            data={listPost}
            renderItem={({ item, key }) => (
              <PostItems item={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
            //onEndReached={handleLoadMorePost}
            // onEndReachedThreshold={0.5}
          />
        </Layout>
      )}
    </Layout>
  )
}
export default PostScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    marginVertical: 8
  }
})
