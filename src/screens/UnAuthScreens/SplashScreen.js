import { useTheme } from '@react-navigation/native'
import { Button, Text } from '@ui-kitten/components'
import { IMAGES } from 'assets'
import PropTypes from 'prop-types'
import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/Feather'

const slides = [
  {
    key: 1,
    title: '',
    text: '',
    image: IMAGES.SPLASH1_IMAGE
  },
  {
    key: 2,
    title: '',
    text: '',
    image: IMAGES.SPLASH2_IMAGE
  },
  {
    key: 3,
    title: '',
    text: '',
    image: IMAGES.SPLASH3_IMAGE
  },
  {
    key: 4,
    title: '',
    text: '',
    image: IMAGES.SPLASH4_IMAGE
  }
]

export default function SplashScreen({ onDone }) {
  const { colors } = useTheme()

  _renderItem = ({ item }) => {
    if (!item) return null
    return (
      <ImageBackground style={styles.slide} source={item.image}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </ImageBackground>
    )
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.nextButton}>Tiếp theo</Text>
        <Icon name='arrow-right' color={colors.primary} size={24} />
      </View>
    )
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Button>Khám phá ứng dụng WeMarket</Button>
        <Icon name='external-link' color={colors.primary} size={24} />
      </View>
    )
  }
  _renderPagination = activeIndex => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? { backgroundColor: 'white' }
                      : { backgroundColor: 'rgba(0, 0, 0, .2)' }
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#023e3f' }]}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    )
  }
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      nextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderPagination={_renderPagination}
      onDone={onDone}
      showSkipButton={true}
      style={{ backgroundColor: colors.background }}
    />
  )
}

SplashScreen.propsTypes = {
  onDone: PropTypes.func
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide: { flex: 1, resizeMode: 'cover', opacity: 0.9 },
  title: {
    marginTop: 92,
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278'
  },
  buttonText: {
    color: 'red',
    fontWeight: '600',
    textAlign: 'center'
  }
})
// {
//   key: 1,
//   title: 'Xin chào',
//   text: 'Đăng ký thành viên để gia nhập nhóm WeMarket',
//   image: IMAGES.SPLASH1_IMAGE
// },
// {
//   key: 2,
//   title: 'Cập nhật thông tin khuyến mãi mỗi ngày',
//   text: 'Đi chợ tiết kiệm hơn với nhiều mặt hàng khuyến mãi mỗi ngày ',
//   image: IMAGES.SPLASH2_IMAGE
// },
// {
//   key: 3,
//   title: 'Mua hàng dễ dàng',
//   text: 'Hỗ trợ chi phí giao hàng cho đơn hàng từ 1.000.000vnd trong phạm vi 10km ',
//   image: IMAGES.SPLASH3_IMAGE
// },
// {
//   key: 4,
//   title: 'Tìm kiếm sản phẩm nhanh chóng',
//   text: 'Đề xuất sản phẩm , tìm kiếm sảm phẩm theo địa điểm phạm vi phù hợp với bạn nhất ',
//   image: IMAGES.SPLASH3_IMAGE
// }
