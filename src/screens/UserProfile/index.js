import React, { Component, useEffect, useState, useCallback } from 'react'
import {
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ProductItem from 'components/ProductItem'
import {
  Icon,
  Text,
  Avatar,
  Button,
  OverflowMenu,
  MenuItem,
  TopNavigationAction
} from '@ui-kitten/components'
import { GET_POST_USER } from 'configs/api/apiPath'
import axios from 'configs/api/baseUrl'
import { findRoom } from 'actions/chatActions'

const UserProfile = ({ route }) => {
  const { uid, username, avatar } = route.params
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [offset, setOffset] = useState(0)
  const [isListEnd, setIsListEnd] = useState(false)
  const [menuVisible, setMenuVisible] = React.useState(false)
  const userState = useSelector(state => state.userState.userInfo)
  const messageReducer = useSelector(state => state.manageChat)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const friend = {
    displayName: username,
    photoURL: avatar,
    uid: uid
  }

  const dispatchChat = async () => {
    await findRoom(userState, friend, navigation)
  }

  const handleLoadMore = async () => {
    // if (offset >= withNumber('listPost.total', listPostReducer) / 20 + 1) {
    //   setLoading(false)
    // } else {

    if (!isListEnd) {
      try {
        setLoading(true)
        const res = await axios.post(GET_POST_USER, {
          offset: offset,
          uid: uid
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
  const MessageIcon = props => (
    <FontAwesome5
      {...props}
      name='facebook-messenger'
      size={20}
      color='white'
    />
  )
  const ShareIcon = props => (
    <Icon {...props} name='md-share-social-outline' pack='ionicons' />
  )
  const ReportIcon = props => (
    <Icon {...props} name='alert-circle-outline' pack='ionicons' />
  )
  const BlockIcon = props => <Icon {...props} name='block' pack='material' />
  const MenuIcon = props => <Icon {...props} name='more-horizontal' />
  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const renderMenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={toggleMenu}
      style={styles.buttonMore}
    />
  )
  const HeaderProfile = () => {
    return (
      <View style={styles.container}>
        {/* <Card style={styles.cardContainer}> */}
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={{
              uri: 'https://forums.macrumors.com/attachments/img_0215-jpg.685731/'
            }}
          >
            <View style={styles.headerColumn}>
              <View>
                <Avatar
                  rounded
                  size='large'
                  source={{
                    uri:
                      avatar ||
                      'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
                  }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
              <View style={styles.userName}>
                <Text style={styles.userNameText}>{username}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.rowButton}>
          <Button
            style={styles.buttonMessage}
            accessoryLeft={MessageIcon}
            onPress={() => dispatchChat()}
          >
            Nhắn tin
          </Button>
          <Button appearance='outline' onPress={toggleMenu}>
            <OverflowMenu
              anchor={renderMenuAction}
              visible={menuVisible}
              onBackdropPress={toggleMenu}
            >
              <MenuItem accessoryLeft={ShareIcon} title='Chia sẻ' />
              <MenuItem accessoryLeft={ReportIcon} title='Báo cáo' />
              <MenuItem accessoryLeft={BlockIcon} title='Chặn người này' />
            </OverflowMenu>
          </Button>
        </View>
        <View style={styles.row}>
          <View style={styles.separator}></View>
        </View>
        <Text style={styles.textTitle}>Bài viết của {username}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={dataSource}
      numColumns={2}
      renderItem={({ item, key }) => (
        <ProductItem
          product={item}
          //   data={dataSource}
          //   setData={setDataSource}
          index={key}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      initialNumToRender={20}
      onEndReached={handleLoadMore}
      ListFooterComponent={_renderFooter}
      ListHeaderComponent={HeaderProfile}
      onEndReachedThreshold={0.1}
      enableEmptySections={true}
    />
  )
}
export default UserProfile
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1
      },
      android: {
        alignItems: 'center'
      }
    })
  },
  userCityText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },

  userName: {
    flexDirection: 'row'
  },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
    paddingRight: 5
  },
  rowButton: {
    flexDirection: 'row',
    margin: 10,
    flex: 1
  },
  buttonMessage: {
    marginRight: 10,
    flex: 5
  },
  buttonMore: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    margin: 10
  },
  separator: {
    borderColor: 'lightgray',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  textTitle: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold'
  }
})
