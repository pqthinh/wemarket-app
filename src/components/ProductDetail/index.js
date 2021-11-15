import { withEmpty, withRandomImage, withNull } from 'exp-value'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
import 'moment/locale/vi'
moment.locale('vi')

const ProductItem = ({
  navigation,
  product,
  isTopProduct = true,
  isTopLike = true,
  isReputation = true
}) => {
  const news = fakeNews

  const handleNavigateToDetail = () => {
    navigation.navigate('Detail', { news })
  }

  return (
    <TouchableOpacity onPress={() => handleNavigateToDetail()}>
      <Container>
        <ImageProduct source={{ uri: withRandomImage('image', news) }} />
        <WrapperContentProduct>
          <NameProduct ellipsizeMode='tail' numberOfLines={2}>
            {withEmpty('name', news)}
          </NameProduct>
          <Price value={withEmpty('price', news)} />

          <WrapperIcon style={{ fontSize: 12 }}>
            <Icon name='map-pin' size={16} />
            <Place numberOfLines={1}>{withEmpty('address', news)}</Place>
          </WrapperIcon>

          <WrapperIcon style={{ fontSize: 12 }}>
            <Icon name='calendar' size={16} />
            <PostTime>{moment(withNull('updatedAt', news)).fromNow()}</PostTime>
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

const fakeNews = {
  id: 1,
  code: '1',
  name: 'Samsung Galaxy Note 10 Plus 5G 256GB Korea | Ship',
  description: 'Samsung Galaxy Note 10 Plus 5G Korea 256Gb',
  categoryId: 1,
  price: 9490000,
  uid: 'ZVWjy74rfrUYvWMpH2Ai',
  createdAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  lng: null,
  lat: null,
  address: 'ha tinh',
  admin_id: null,
  quantity: 3,
  image:
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/iphone-11-pro-max-mat-truoc-sau.jpg',
  status: '0',
  tag: '0',
  like_num: 0,
  view: 0,
  username: 'vo thi van',
  email: 'meo@gmail',
  phone: '123',
  gender: '2',
  birthday: '',
  avatar: '',
  images: ['https://clickbuy.com.vn/uploads/2019/09/thumb_11-ProMAX_3.jpg']
}
