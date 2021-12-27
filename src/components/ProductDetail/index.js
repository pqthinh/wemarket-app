import { withEmpty, withNull, withRandomImage } from 'exp-value'
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

const ProductItem = ({
  navigation,
  product,
  isTopProduct = true,
  isTopLike = true,
  isReputation = true
}) => {
  const handleNavigateToDetail = () => {
    navigation.navigate('Detail', { product })
  }

  return (
    <TouchableOpacity onPress={() => handleNavigateToDetail()}>
      <Container>
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
        </WrapperContentProduct>
        {isTopProduct ? (
          <TopProduct source={require('assets/images/top-product.png')} />
        ) : null}
        {isTopLike ? (
          <TopLikeProduct source={require('assets/images/like.png')} />
        ) : null}
        {isReputation ? <TrustTag>Được đảm bảo</TrustTag> : null}
      </Container>
    </TouchableOpacity>
  )
}

export default React.memo(ProductItem)
