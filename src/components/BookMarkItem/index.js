import { withEmpty, withRandomImage, withNull } from 'exp-value'
import moment from 'moment'
import React, { useCallback } from 'react'

import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Container,
  ImageProduct,
  NameProduct,
  Place,
  PostTime,
  Price,
  WrapperIcon,
  WrapperContentProduct,
  Icon,
  TopProduct,
  TopLikeProduct,
  TrustTag
} from './styled'
import { useNavigation } from '@react-navigation/native'
import 'moment/locale/vi'
import { Button, Text } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBookmarks,
  createBookmark,
  deleteBookmark
} from 'actions/bookmarkActions'
moment.locale('vi')

const BookMarkItem = ({
  product,
  style,
  isTopProduct = true,
  isTopLike = true,
  isReputation = true
}) => {
  const id = product.productId
  product = { ...product, id }
  const navigation = useNavigation()

  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })

  const handlePressCreate = useCallback(
    (uid, id) => {
      dispatch(createBookmark({ uid: uid, productId: id }))
    },
    [dispatch]
  )

  const handlePressDelete = useCallback(
    (uid, id) => {
      dispatch(deleteBookmark({ uid: uid, productId: id }))
    },
    [dispatch]
  )
  const handleNavigateToDetail = () => {
    navigation.navigate('DETAIL_PRODUCT', { product })
  }
  const handleNavigateToSameProduct = () => {
    navigation.navigate('SameProductScreen', { product })
  }
  return (
    <TouchableOpacity onPress={() => handleNavigateToDetail()}>
      <Container style={style}>
        <ImageProduct source={{ uri: withRandomImage('image', product) }} />
        <WrapperContentProduct>
          <NameProduct ellipsizeMode='tail' numberOfLines={2}>
            {withEmpty('name', product)}
          </NameProduct>
          <Price value={withEmpty('price', product)} />

          <WrapperIcon style={{ fontSize: 12 }}>
            <Icon name='map-pin' size={16} />
            <Place numberOfLines={1}>{withEmpty('address', product)}</Place>
          </WrapperIcon>

          <WrapperIcon style={{ fontSize: 12 }}>
            <Icon name='calendar' size={16} />
            <PostTime>
              {moment(withNull('updatedAt', product)).fromNow()}
            </PostTime>
          </WrapperIcon>
          <WrapperIcon style={{ fontSize: 15, marginTop: 10, marginLeft: 0 }}>
            <Button
              onPress={() =>
                handlePressDelete(
                  withEmpty('userInfo.uid', userReducer),
                  product.productId
                )
              }
              appearance='outline'
              size='small'
              accessoryLeft={
                <MaterialCommunityIcons
                  name='bookmark-off-outline'
                  size={18}
                  color='#E26740'
                />
              }
              style={{ width: 80, marginRight: 5 }}
            >
              Bỏ lưu
            </Button>
            <Button
              appearance='outline'
              size='small'
              style={{ width: 85 }}
              onPress={() => handleNavigateToSameProduct()}
            >
              <Text numberOfLines={1}>Tìm sản phẩm tương tự</Text>
            </Button>
          </WrapperIcon>
        </WrapperContentProduct>
        {isTopProduct ? (
          <TopProduct source={require('assets/images/top-product.png')} />
        ) : null}
        {isTopLike ? (
          <TopLikeProduct source={require('assets/images/like.png')} />
        ) : null}
        {isReputation ? <TrustTag>Tài trợ</TrustTag> : null}
      </Container>
    </TouchableOpacity>
  )
}

export default React.memo(BookMarkItem)
