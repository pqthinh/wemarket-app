import { useTheme } from '@react-navigation/native'
import { Text } from '@ui-kitten/components'
import { IMAGES } from 'assets'
import PropTypes from 'prop-types'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Background, DoneButton, Icon, WrapperText } from './styled'

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
      <Background source={item.image}>
        <Text>{item.title}</Text>
        <Text>{item.text}</Text>
      </Background>
    )
  }
  _renderNextButton = () => {
    return (
      <DoneButton>
        <WrapperText style={{ padding: 4 }}>Tiếp</WrapperText>
        <Icon name='arrow-right' color={colors.primary} size={24} />
      </DoneButton>
    )
  }
  _renderSkipButton = () => {
    return (
      <DoneButton>
        <WrapperText style={{ padding: 4 }}>Bỏ qua</WrapperText>
        {/* <Icon name='external-link' color={colors.primary} size={24} /> */}
      </DoneButton>
    )
  }
  _renderDoneButton = () => {
    return (
      <DoneButton>
        <WrapperText style={{ padding: 4 }}>WeMarket</WrapperText>
        <Icon name='external-link' color={colors.primary} size={24} />
      </DoneButton>
    )
  }

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      showSkipButton={true}
      onDone={onDone}
    />
  )
}

SplashScreen.propsTypes = {
  onDone: PropTypes.func
}
