import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import { getPostUser } from 'actions/profileActions'
import { withArray } from 'exp-value'
import PostItems from 'components/PostItems'
const PostScreen = ({ user }) => {
  const [listPost, setListPost] = useState(null)
  const dispatch = useDispatch()
  const listPostReducer = useSelector(state => {
    return state.manageProfile
  })
  useEffect(() => {
    if (listPostReducer) {
      setListPost(withArray('listPost.result', listPostReducer))
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
  return (
    <Layout>
      {listPost == [] ? (
        <Layout style={styles.container}>
          <Text category='h4'>Chưa có bài viết nào</Text>
        </Layout>
      ) : (
        <FlatList
          data={listPost}
          renderItem={({ item, key }) => <PostItems item={item} index={key} />}
          keyExtractor={(_, index) => index.toString()}
        />
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
