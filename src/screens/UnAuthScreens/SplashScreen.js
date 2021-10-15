import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import AppIntroSlider from 'react-native-app-intro-slider'
import { IMAGES } from 'assets'

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: IMAGES.SPLASH1_IMAGE,
    backgroundColor: '#59b2ab'
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: IMAGES.SPLASH2_IMAGE,
    backgroundColor: '#febe29'
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: IMAGES.SPLASH3_IMAGE,
    backgroundColor: '#22bcb5'
  }
]

export default function SplashScreen({ onDone }) {
  _renderItem = ({ item }) => {
    if (!item) return null
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name='md-arrow-round-forward'
          color='rgba(255, 255, 255, .9)'
          size={24}
        />
      </View>
    )
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name='md-checkmark' color='rgba(255, 255, 255, .9)' size={24} />
      </View>
    )
  }
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
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
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
  //[...]
})
