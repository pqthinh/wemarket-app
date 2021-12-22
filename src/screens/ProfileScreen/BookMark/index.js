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
import {
  getBookmarks,
  createBookmark,
  deleteBookmark
} from 'actions/bookmarkActions'
import BookMarkItem from 'components/BookMarkItem'

const BookmarkScreen = () => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const bookmarksReducer = useSelector(state => {
    return state.manageBookmarks
  })
  useEffect(() => {
    dispatch(getBookmarks(userReducer.userInfo.uid + '/all'))
  }, [])
  useEffect(() => {
    if (bookmarksReducer.listBookmark) {
      console.log(bookmarksReducer.listBookmark.length, 'length list')
    }
  }, [bookmarksReducer])

  if (bookmarksReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Layout level='3'>
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
        </Layout> */}
        <View style={styles.spinnerView}>
          <ActivityIndicator size='large' color='#E26740' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Layout level='3'>
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
      </Layout> */}

      {bookmarksReducer.listBookmark != [] ? (
        <Layout>
          <FlatList
            data={bookmarksReducer.listBookmark}
            numColumns={2}
            //inverted={true}
            renderItem={({ item, key }) => (
              <BookMarkItem product={item} index={key} />
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
export default BookmarkScreen
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
