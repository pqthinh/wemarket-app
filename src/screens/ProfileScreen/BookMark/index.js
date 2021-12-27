import React, { useState, useEffect, useCallback } from 'react'
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
import { category } from 'utils/map/category'

const BookmarkScreen = () => {
  const navigation = useNavigation()
  const [menuVisible, setMenuVisible] = useState(false)
  const [changeCategory, setChangeCategory] = useState('Tất cả')
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
  const onPressCategory = useCallback(
    id => {
      dispatch(getBookmarks(userReducer.userInfo.uid + `/${id}`))
    },
    [dispatch]
  )
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
          numberOfLines={1}
          style={{
            color: '#52A4FF',
            width: 100,
            alignSelf: 'center',
            paddingLeft: 45
          }}
        >
          {changeCategory}
        </Text>
        <OverflowMenu
          anchor={renderMenuAction}
          visible={menuVisible}
          onBackdropPress={toggleMenu}
        >
          <MenuItem
            title='Tất cả'
            onPress={() => {
              setChangeCategory('Tất cả')
              dispatch(getBookmarks(userReducer.userInfo.uid + '/all'))
              toggleMenu()
            }}
          />
          {category.map(item => {
            return (
              <MenuItem
                title={item.name}
                onPress={() => {
                  onPressCategory(item.id)
                  setChangeCategory(item.name)
                  toggleMenu()
                }}
              />
            )
          })}
          {/* <MenuItem title='Điện tử' /> */}
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

      {bookmarksReducer.listBookmark.length ? (
        <Layout style={styles.container}>
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
        <Layout style={styles.container}>
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
    flex: 1
  }
})
