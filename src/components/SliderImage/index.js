import React, { useCallback } from 'react'
import { View } from 'react-native'
import ImageSlider from 'react-native-image-slider'

const SliderImage = ({ images, style, ...rest }) => {
  const banner = images || [
    'https://cf.shopee.sg/file/ef1f3dfe1379a24a2c73cf905cc34489_xxhdpi',
    'https://cf.shopee.sg/file/c78d11375af2e09bf6ce40a686581a3e_xxhdpi',
    'https://cf.shopee.sg/file/cf9b37c13e9299000eaf3baa714e7e67_xxhdpi',
    'https://cf.shopee.sg/file/c3b16b6b1c961579af9ec840e86c63ed_xxhdpi',
    'https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1600743091481.jpg'
  ]

  const _renderBanner = useCallback(() => {
    return (
      <ImageSlider
        images={banner}
        loop
        loopBothSides
        autoPlayWithInterval={3000}
        {...rest}
      />
    )
  }, [banner])

  return (
    <View style={style || { width: '100%', height: 160 }}>
      {_renderBanner()}
    </View>
  )
}
export default React.memo(SliderImage)
