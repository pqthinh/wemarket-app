import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'

export default function SliderImage({ images, styleBanner }) {
  const [banner, setBanner] = useState(images)

  const fake = useMemo(() => {
    return [
      'https://th.bing.com/th/id/OIP.3la2QRd77e_GTIuG3-RN6gHaD3?w=339&h=180&c=7&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.XnxTALv17Vb3SGe5hTLJDgHaCe?w=343&h=116&c=7&o=5&pid=1.7',
      'https://picsum.photos/200',
      'https://www.bing.com/th?id=OIP.xDlZeZJDU33bdfnVHQ5UjwHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      'https://picsum.photos/700',
      'https://static.chotot.com.vn/storage/admin-centre/buyer_collection_y_homepage_banner/buyer_collection_y_homepage_banner_1600743091481.jpg'
    ]
  }, [])

  const _renderBanner = useCallback(() => {
    return (
      <SliderBox
        images={banner || fake}
        autoplay
        circleLoop
        sliderBoxHeight={200}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10
        }}
      />
    )
  }, [fake])

  useEffect(() => {
    if (!images) {
      setBanner(images)
      return
    }
    setBanner(fake)
  }, [images])

  return (
    <View style={styleBanner || { width: '100%', height: 160 }}>
      {_renderBanner()}
    </View>
  )
}
