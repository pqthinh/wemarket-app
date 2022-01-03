import { useNavigation } from '@react-navigation/native'
import {
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { getBookmarks } from 'actions/bookmarkActions'
import BookMarkItem from 'components/BookMarkItem'
import { withEmpty } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
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
    dispatch(getBookmarks(withEmpty('userInfo.uid', userReducer) + '/all'))
  }, [])
  const onPressCategory = useCallback(
    id => {
      dispatch(getBookmarks(withEmpty('userInfo.uid', userReducer) + `/${id}`))
    },
    [dispatch]
  )

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
              dispatch(
                getBookmarks(withEmpty('userInfo.uid', userReducer) + '/all')
              )
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

      {bookmarksReducer.listBookmark != [] ? (
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
          <Image source={require('images/no-post.jpg')} style={styles.image} />
          <Text category='h6' style={styles.textBookmark}>
            Bạn chưa lưu sản phẩm nào
          </Text>
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
  },
  textBookmark: {
    textAlign: 'center'
  },
  image: {
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 3,
    resizeMode: 'contain',
    marginTop: Dimensions.get('screen').height / 6
  }
})
