import { useNavigation } from '@react-navigation/native'
import { withBoolean, withEmpty, withNull, withRandomImage } from 'exp-value'
import moment from 'moment'
import 'moment/locale/vi'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Container,
  Icon,
  ImageProduct,
  NameProduct,
  Place,
  PostTime,
  Price,
  TopLikeProduct,
  TopProduct,
  TrustTag,
  WrapperContentProduct,
  WrapperIcon
} from './styled'

moment.locale('vi')

const ProductItem = ({ product, style, isReputation = true }) => {
  const navigation = useNavigation()

  const handleNavigateToDetail = () => {
    navigation.navigate('DETAIL_PRODUCT', { product })
  }
  if (product.productId) {
    product = { ...product, id: product.productId }
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
            <Place numberOfLines={2}>
              {(withEmpty('distance', product) || '0') +
                ' km (' +
                withEmpty('address', product) +
                ')'}
            </Place>
          </WrapperIcon>

          <WrapperIcon style={{ fontSize: 12 }}>
            <Icon name='calendar' size={16} />
            <PostTime>
              {moment(withNull('updatedAt', product)).fromNow()}
            </PostTime>
          </WrapperIcon>
        </WrapperContentProduct>
        {withBoolean('isTop', product) ? (
          <TopProduct source={require('assets/images/top-product.png')} />
        ) : null}
        {withBoolean('isFav', product) ? (
          <TopLikeProduct source={require('assets/images/like.png')} />
        ) : null}
        {isReputation ? <TrustTag>Tài trợ</TrustTag> : null}
      </Container>
    </TouchableOpacity>
  )
}

export default React.memo(ProductItem)
