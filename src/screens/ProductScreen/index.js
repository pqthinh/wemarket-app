import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import {
  getProductDetail,
  getListComment,
  addToBookmark
} from 'actions/productActions'
import { toggleBottom } from 'actions/userActions'
import CommentInput from 'components/CommentComponent/CommentInput'
import ListComment from 'components/CommentComponent/ListComment'
import UserPreviewComponent from 'components/CommentComponent/UserPreviewComponent'
import NumberFormatComponent from 'components/NumberFormatComponent'
import SliderImage from 'components/SliderImage'
import {
  withArray,
  withEmpty,
  withNull,
  withNumber,
  withObject
} from 'exp-value'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styled'
import { findRoom } from 'actions/chatActions'

const ProductScreen = () => {
  const route = useRoute()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const productState = useSelector(state => state.productDetail)
  const setting = useSelector(state => state.settingState)
  const userState = useSelector(state => state.userState.userInfo)
  const bookmark = useSelector(state => state.listBookmark.bookmark)
  const messageReducer = useSelector(state => state.manageChat)

  const [product, setProduct] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const friend = {
    displayName: withEmpty('username', product),
    photoURL: withEmpty('avatar', product),
    uid: withEmpty('uid', product)
  }
  const dispatchChat = async () => {
    await findRoom(userState, friend, navigation)
  }

  useEffect(() => {
    const r = withNull('params.product', route)
    const params = {
      idProduct: r.id,
      uid: withEmpty('uid', userState),
      lat: withEmpty('location.latitude', setting),
      lng: withEmpty('location.longitude', setting)
    }
    dispatch(getProductDetail(params))
    dispatch(getListComment({ idProduct: r.id }))
    dispatch(toggleBottom(true))
    return null
  }, [route, setting.location])

  useEffect(() => {
    setProduct(withObject('product', productState))
    setComments(withArray('listComment', productState))
  }, [productState.product, productState.listComment])

  useEffect(() => {
    return () => dispatch(toggleBottom(false))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Layout level={'3'}>
          <TopNavigation
            title={() => (
              <Text
                style={{ fontSize: 18, fontWeight: '700' }}
                numberOfLines={1}
              >
                {withEmpty('name', product)}
              </Text>
            )}
            accessoryLeft={
              <TopNavigationAction
                icon={<Icon name='arrow-back' size={24} />}
                onPress={() => {
                  dispatch(toggleBottom(false))
                  navigation.goBack()
                }}
              />
            }
            accessoryRight={() => (
              <>
                <TopNavigationAction
                  icon={<Icon name='shopping-cart' size={24} />}
                  onPress={() => {
                    Linking.openURL(
                      `tel: ${withEmpty('phone', product) || '0866564502'}`
                    )
                  }}
                />
                <TopNavigationAction
                  icon={
                    <Icon
                      name='more-vertical'
                      size={24}
                      style={styles.IconWrapper}
                    />
                  }
                  onPress={() => {
                    console.log(product)
                  }}
                />
              </>
            )}
          />
        </Layout>
        <Divider />
        <SliderImage
          style={{ width: '100%', height: 250 }}
          images={[
            ...withArray('images', product),
            withEmpty('image', product)
          ]}
        />

        <View style={styles.blockName}>
          <Text style={styles.title} numberOfLines={2}>
            {withEmpty('name', product)}
          </Text>
          <NumberFormatComponent
            style={styles.money}
            value={withEmpty('price', product)}
          />
          <Text style={styles.time}>
            {'Ngày đăng tin: ' +
              moment(new Date(withEmpty('updatedAt', product))).format(
                'hh:mm DD:MM:yyyy'
              )}
          </Text>
          <Text style={styles.time}>
            {'Địa chỉ: ' + withEmpty('address', product)}
          </Text>
        </View>

        <Layout style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.sharing}>
            <View style={styles.rowSharing}>
              <Icon
                fill='#E26740'
                name='eye'
                size={24}
                style={styles.iconSharing}
              />
              <Text style={styles.sharingContent}>
                {withEmpty('view', product)}
              </Text>
            </View>
            <View style={styles.rowSharing}>
              <Icon
                fill='#E26740'
                name='heart'
                size={24}
                style={styles.iconSharing}
              />
              <Text style={styles.sharingContent}>
                {withEmpty('like_num', product)}
              </Text>
            </View>
            <View style={styles.rowSharing}>
              <Icon
                fill='#E26740'
                name='message-square-outline'
                size={24}
                style={styles.iconSharing}
              />
              <Text style={styles.sharingContent}>
                {withNumber('length', comments)}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.sharing,
              { justifyContent: 'flex-end', marginHorizontal: 10 }
            ]}
          >
            <View style={styles.rightSharing}>
              <Icon
                fill='#E26740'
                name='paper-plane-outline'
                size={24}
                style={styles.iconSharing}
                onPress={() => console.log('object')}
              />
              <Text style={styles.rightIcon}>Chia sẻ</Text>
            </View>
            <View style={styles.rightSharing}>
              <Icon
                fill='#E26740'
                name='message-circle'
                size={24}
                style={styles.iconSharing}
                onPress={() => dispatchChat()}
              />
              <Text style={styles.rightIcon}>Chat</Text>
            </View>
            <View style={styles.rightSharing}>
              <Icon
                fill='#E26740'
                name={
                  bookmark.includes(withEmpty('id', product))
                    ? 'bookmark'
                    : 'bookmark-outline'
                }
                size={24}
                style={styles.iconSharing}
                onPress={() => dispatch(addToBookmark(product.id))}
              />
              <Text style={styles.rightIcon}>Lưu</Text>
            </View>
          </View>
        </Layout>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserScreen', {
              avatar: withEmpty('avatar', product),
              username: withEmpty('username', product),
              uid: withEmpty('uid', product)
            })
          }
        >
          <UserPreviewComponent
            user={{
              avatar: withEmpty('avatar', product),
              username: withEmpty('username', product),
              email: withEmpty('email', product),
              star: withEmpty('star', product)
            }}
          />
        </TouchableOpacity>

        <View style={styles.description}>
          <Text
            style={{ fontWeight: '800', paddingVertical: 10, fontSize: 18 }}
          >
            Thông tin về sản phẩm:
          </Text>
          <Text>{withEmpty('description', product)}</Text>
        </View>

        <View>
          <CommentInput comment={comment} setComment={setComment} />
        </View>
        <View>
          <ListComment listComments={comments} />
        </View>
      </ScrollView>

      <View style={styles.bottomScreen}>
        <TouchableOpacity
          style={[styles.flexRow, styles.offline]}
          onPress={() => Linking.openURL(`tel: ${product.phone}`)}
        >
          <Text style={styles.titleBottomTab}>Gọi điện</Text>
          <Icon fill='#fff' name='phone-call' style={styles.iconBottom} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flexRow} onPress={() => dispatchChat()}>
          <Text style={{ fontWeight: '700', paddingHorizontal: 8 }}>
            Chat online
          </Text>
          <Icon fill='#000' name='message-circle' style={styles.iconBottom} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.flexRow, styles.offline]}
          onPress={() => Linking.openURL(`sms: ${product?.phone}`)}
        >
          <Text style={styles.titleBottomTab}>Nhắn tin</Text>
          <Icon fill='#fff' name='message-square' style={styles.iconBottom} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProductScreen
