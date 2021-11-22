import React, { useCallback } from 'react'
import { View, SafeAreaView } from 'react-native'
import ImageSlider from 'react-native-image-slider'

const SliderImage = ({ images, style, ...rest }) => {
  const banner = images || [
    'https://th.bing.com/th/id/OIP.3la2QRd77e_GTIuG3-RN6gHaD3?w=339&h=180&c=7&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.XnxTALv17Vb3SGe5hTLJDgHaCe?w=343&h=116&c=7&o=5&pid=1.7',
    'https://picsum.photos/200',
    'https://www.bing.com/th?id=OIP.xDlZeZJDU33bdfnVHQ5UjwHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    'https://picsum.photos/700',
    'https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1600743091481.jpg'
  ]

  const _renderBanner = useCallback(() => {
    return <ImageSlider images={banner} {...rest} />
  }, [banner])

  return (
    <SafeAreaView>
      <View style={style || { width: '100%', height: 160 }}>
        {_renderBanner()}
      </View>
    </SafeAreaView>
  )
}
export default React.memo(SliderImage)
