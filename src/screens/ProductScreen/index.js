import { withArray, withEmpty, withNull } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons
} from 'react-native-vector-icons'

const ProductScreen = ({ navigation, route }) => {
  const [news, setNews] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    const r = withNull('params.news', route)
    if (r) return setNews(r)
    return setNews(fakeNews)
  }, [])

  const _renderComment = useCallback(() => {
    return <Text>Comment component</Text>
  }, [news])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <Text style={styles.title}>{news.ten}</Text>,
      headerRight: () => (
        <View style={styles.IconWrapper}>
          <Feather
            name='phone-call'
            size={24}
            style={styles.IconWrapper}
            onPress={() =>
              Linking.openURL(
                `tel: ${withEmpty('user.phone', news) || '0866564502'}`
              )
            }
          />
          <Feather
            name='more-vertical'
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log('more')
            }}
          />
        </View>
      )
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: '100%', height: 250 }}>
          <SliderBox
            images={withArray('anh', news)}
            autoplay
            circleLoop
            sliderBoxHeight={400}
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
          <Feather
            name={'arrow-left'}
            size={30}
            color={'#000'}
            style={{ position: 'absolute', top: 20, left: 5 }}
            onPress={() => {
              navigation.goBack()
            }}
          />
        </View>

        <View style={styles.blockName}>
          <Text style={styles.title}>{withEmpty('ten', news)}</Text>
          <Text style={styles.money}>
            Giá bán:
            {withEmpty('giaban', news)}
          </Text>
          <Text style={styles.time}>
            Ngày đăng tin: {' ' + withEmpty('ngaydangtin.slice(0, 10)', news)}
          </Text>
          <Text> Địa chỉ: {' ' + withEmpty('diadiem', news)}</Text>
          <View style={styles.function}>
            <View style={styles.IconWrapper}>
              <Feather
                name='shopping-cart'
                size={24}
                style={styles.IconWrapper}
                onPress={() => {
                  console.log('more')
                }}
              />
            </View>
            <View>
              <Feather
                name='heart'
                size={24}
                style={styles.IconWrapper}
                onPress={() => {
                  console.log('more')
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <Text>user profile preview</Text>
        </View>

        <View style={styles.description}>
          <Text>{withEmpty('mieuta', news)}</Text>
        </View>

        <View>{_renderComment()}</View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: '#fff'
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#aed581',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 10
          }}
          onPress={() => Linking.openURL(`tel: ${news.user.phone}`)}
        >
          <Ionicons
            name='ios-call'
            style={{ paddingRight: 10 }}
            size={24}
            color='#000'
          />
          <Text style={{ color: '#000' }}>Gọi điện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            color: '#aed581',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 10
          }}
          onPress={() => Linking.openURL(`sms: ${news.user.phone}`)}
        >
          <FontAwesome5
            name='sms'
            size={24}
            color='#aed581'
            style={{ paddingRight: 10 }}
          />
          <Text style={{ color: 'black' }}>Nhắn tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: '#aed581',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingVertical: 10
          }}
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
                      title: `${withEmpty('user.name', news)}`,
                      phone: `${withEmpty('user.phone', news)}`,
                      id: news.id
                    }
                  })
                }
              }
            ])
          }}
        >
          <AntDesign
            name='wechat'
            style={{ paddingRight: 10 }}
            size={24}
            color='#000'
          />
          <Text style={{ color: '#000' }}>Chat online</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  IconWrapper: { flexDirection: 'row', marginHorizontal: 5, color: '#000' },
  blockName: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5
  },
  money: { color: 'red' },
  function: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 5
  },
  moreInfoUser: {
    borderColor: '#fe9900',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    width: 120,
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'center',
    marginHorizontal: 5,
    fontSize: 10
  },
  description: {
    padding: 10
  },
  commentInput: {},
  listComment: {},
  userComment: { fontSize: 14 }
})

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
    place: 'Thai Binh',
    star: '4',
    phone: '0866564502',
    avatar_url: 'https://picsum.photos/200'
  },
  mieuta: `Cấu hình : SURFACE LAPTOP 3 I5/ RAM 8GB/ SSD 256GB 13INCH NEW
-CPU: Intel® Core™ Core i5
-GPU: Intel Iris Plus Graphics
-RAM: 8GB 3733MHz DDR4
-Ổ lưu trữ: 256GB removable SSD
-Kích thước: 308.1 x 223.27 x 14.48 mm
-Trọng lượng: 1283g
-Hệ điều hành: Widows 10`
}
