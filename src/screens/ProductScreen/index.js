import { useNavigation } from '@react-navigation/native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { getProductDetail, getListComment } from 'actions/productActions'
import { toggleBottom } from 'actions/userActions'
import CommentInput from 'components/CommentComponent/CommentInput'
import ListComment from 'components/CommentComponent/ListComment'
import UserPreviewComponent from 'components/CommentComponent/UserPreviewComponent'
import NumberFormatComponent from 'components/NumberFormatComponent'
import SliderImage from 'components/SliderImage'
import { withArray, withEmpty, withNull, withNumber } from 'exp-value'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styled'

const ProductScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const productState = useSelector(state => state.productDetail)
  const setting = useSelector(state => state.settingState)
  const userState = useSelector(state => state.userState.userInfo)
  const [product, setProduct] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    const r = withNull('params.product', route)
    const params = {
      idProduct: r.id,
      uid: withEmpty('uid', userState),
      lat: withEmpty('location.latitude', setting),
      lng: withEmpty('location.longitude', setting)
    }
    // dispatch(getProductDetail(params))
    dispatch(getListComment({ idProduct: r.id }))
    dispatch(toggleBottom(true))
    return null
  }, [route, setting.location])

  useEffect(() => {
    setProduct(productState.product)
    console.log(productState.product)
  }, [productState.product])
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

        <Layout style={styles.sharing}>
          <View>
            <Icon name='eye' size={24} style={styles.IconWrapper} />
            <Text style={styles.sharingContent}>
              {withEmpty('view', product)}
            </Text>
          </View>
          <View>
            <Icon name='heart' size={24} style={styles.IconWrapper} />
            <Text style={styles.sharingContent}>
              {withEmpty('like_num', product)}
            </Text>
          </View>
          <View>
            <Icon name='message-circle' size={24} style={styles.IconWrapper} />
            <Text style={styles.sharingContent}>
              {withNumber('length', comments)}
            </Text>
          </View>
          <Icon name='heart' size={24} style={styles.IconWrapper} />
        </Layout>

        <View>
          <UserPreviewComponent
            user={{
              avatar: withEmpty('avatar', product),
              username: withEmpty('username', product),
              email: withEmpty('email', product),
              star: withEmpty('star', product)
            }}
          />
        </View>

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
          style={styles.flexRow}
          onPress={() => Linking.openURL(`tel: ${product.phone}`)}
        >
          <Text style={{ color: '#000' }}>Gọi điện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => Linking.openURL(`sms: ${product.phone}`)}
        >
          <Text style={{ color: 'black' }}>Nhắn tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => {
            Alert.alert('', 'Chat với người bán', [
              {
                text: 'Hủy',
                onPress: () => {
                  return
                },
                style: 'cancel'
              },
              {
                text: 'Tiếp tục',
                onPress: () => {
                  navigation.navigate('ChatStack', {
                    screen: 'ChatDetail',
                    params: {
                      title: `${withEmpty('username', product)}`,
                      phone: `${withEmpty('phone', product)}`,
                      id: product.id
                    }
                  })
                }
              }
            ])
          }}
        >
          <Text style={{ color: '#000' }}>Chat online</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProductScreen
