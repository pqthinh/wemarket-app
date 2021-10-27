import IconAtoms from '../IconAtoms'
import React from 'react'
import { Image, Platform, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TimeAgo from 'react-native-timeago'
import styles from './style'

const currencyFormatter = require('currency-formatter')

const heightImage =
  Platform.OS == 'android' ? 150 : Platform.OS == 'ios' ? 120 : 180

const fakeNews = {
  anh: [
    'https://picsum.photos/700',
    'https://picsum.photos/700',
    'https://picsum.photos/700'
  ],
  giaban: 1000000,
  ten: 'Test product',
  diadiem: 'Ha noi, Me tri ha',
  ngaydangtin: new Date(),
  ngaycapnhat: new Date(),
  user: {
    name: 'thinh',
    place: 'Thai Binh'
  }
}

export default function ProductItem({ navigation, newsPost, category }) {
  const news = fakeNews
  const handleImage = anh => {
    let imgs = anh
    if (imgs.length == 0 || anh.length == 0) return 'https://picsum.photos/300'
    return imgs[0]
  }

  const handleNavigateToDetail = () => {
    navigation.navigate('Detail', { news })
  }

  return (
    <TouchableOpacity onPress={() => handleNavigateToDetail()}>
      <View
        style={[
          styles.news,
          {
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: '#f0f0f0'
          }
        ]}
      >
        <Image
          style={styles.image}
          source={{ uri: handleImage(news.anh) }}
          title={news.ten}
        />
        <View style={{ margin: 5 }}>
          <Text style={styles.titleOfImage}>
            {news.ten.length > 15
              ? Platform.OS == 'web'
                ? news.ten.slice(0, 18)
                : news.ten.slice(0, 15)
              : news.ten}
          </Text>
          <Text style={{ fontSize: 16, color: 'red' }}>
            {currencyFormatter.format(news.giaban, { code: 'VND' })}
          </Text>
          <Text style={{ fontSize: 12, marginVertical: 2 }}>
            <IconAtoms name='user' size={16} />
            {'  ' + news.user.name}
          </Text>
          <Text style={{ fontSize: 12 }}>
            <IconAtoms name='map-pin' size={16} />{' '}
            {news.diadiem.length > 18
              ? news.diadiem.slice(0, 18) + '...'
              : news.diadiem}
          </Text>
          <Text style={{ fontSize: 12 }}>
            <IconAtoms name='calendar' size={16} />
            {'  '}
            <TimeAgo time={news.ngaycapnhat} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
