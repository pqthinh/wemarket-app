import React, { useState, useEffect } from 'react'
import {
  Icon,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import {
  Layout,
  TopNavigation,
  Text,
  TopNavigationAction,
  OverflowMenu,
  MenuItem
} from '@ui-kitten/components'

import { useDispatch, useSelector } from 'react-redux'
import {
  getBookmarks,
  createBookmark,
  deleteBookmark
} from 'actions/bookmarkActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import BookMarkItem from 'components/BookMarkItem'

const BookmarkScreen = () => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const renderMenuAction = () => (
    <TopNavigationAction
      icon={<MaterialIcons name='arrow-drop-down' size={24} color='#52A4FF' />}
      onPress={toggleMenu}
    />
  )
  const renderRightActions = () => (
    <React.Fragment>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={toggleMenu}>
        <Text
          style={{
            color: '#52A4FF',

            alignSelf: 'center'
          }}
        >
          Tất cả
        </Text>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
        >
          <MenuItem title='Tất cả' />
          <MenuItem title='Điện tử' />
        </OverflowMenu>
      </TouchableOpacity>
    </React.Fragment>
  )
  const renderBackAction = () => (
    <TopNavigationAction
      onPress={() => navigation.goBack()}
      icon={<MaterialIcons name='arrow-back' size={24} color='black' />}
    />
  )
  if (bookmarksReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout level='3'>
          <TopNavigation
            alignment='center'
            title={() => (
              <Text style={{ fontSize: 20, color: 'black' }}>Mục đã lưu</Text>
            )}
            accessoryRight={renderRightActions}
            accessoryLeft={renderBackAction}
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
            <Text style={{ fontSize: 20, color: 'black' }}>Mục đã lưu</Text>
          )}
          accessoryRight={renderRightActions}
          accessoryLeft={renderBackAction}
          style={{
            borderBottomColor: '#F8F8F8',
            borderBottomWidth: 3
          }}
        />
      </Layout>

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
