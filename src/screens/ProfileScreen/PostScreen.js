import React, { useEffect, useState, useCallback, useMemo } from 'react'
import {
  StyleSheet,
  FlatList,
  Dimensions,
  View,
  ActivityIndicator,
  Image
} from 'react-native'
import { withArray, withNumber } from 'exp-value'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Layout, Text } from '@ui-kitten/components'
import { getPostUser, resetPost } from 'actions/profileActions'
import PostItems from 'components/PostItems'
import { GET_POST_USER, UPDATE_USER, DELETE_PRODUCT } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
const PostScreen = ({ user }) => {
  // const dispatch = useDispatch()
  // const listPostReducer = useSelector(state => {
  //   return state.manageProfile
  // })
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [offset, setOffset] = useState(0)
  const [isListEnd, setIsListEnd] = useState(false)

  const handleLoadMore = async () => {
    // if (offset >= withNumber('listPost.total', listPostReducer) / 20 + 1) {
    //   setLoading(false)
    // } else {

    if (!isListEnd) {
      try {
        setLoading(true)
        const res = await axios.post(GET_POST_USER, {
          offset: offset,
          uid: user.uid
        })
        // console.log(res.data.result)
        if (Array.isArray(res.data) && res.data.result.length == 0) {
          // setDataSource([])
          // setLoading(false)
          return
        }

        if (res.data.result.length > 0) {
          //After the response increasing the offset for the next API call.
          setDataSource(dataSource.concat(...res.data.result))
          setOffset(res.data.page)
        } else {
          setIsListEnd(true)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    // dispatch(getPostUser({ uid: user.uid, offset: 0 }))

    handleLoadMore()

    // setDataSource(listPostReducer.listPost.result)
    // setLoading(true)
    // setIsLoading(listPostReducer.loading)
  }, [])

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

  return (
    <Layout style={{ flex: 1 }}>
      {!dataSource ? (
        <Layout style={styles.container}>
          <Image source={require('images/no-post.jpg')} style={styles.image} />
          <Text category='h6' style={styles.textPost}>
            Chưa có bài viết nào
          </Text>
        </Layout>
      ) : (
        <Layout level='3' style={{ flex: 1 }}>
          <FlatList
            nestedScrollEnabled
            data={dataSource}
            renderItem={({ item, key }) => (
              <PostItems
                item={item}
                data={dataSource}
                setData={setDataSource}
                index={key}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={10}
            //onEndReached={handleLoadMorePost}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={0.1}
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  image: {
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 3,
    resizeMode: 'contain'
  },
  textPost: {
    textAlign: 'center',
    marginBottom: Dimensions.get('screen').height / 6
  }
})
