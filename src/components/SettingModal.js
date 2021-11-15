import Slider from '@react-native-community/slider'
import useCache from 'hooks/useCache'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
export default SettingModal = props => {
  const { set, get } = useCache
  const saveRadius = async () => {
    await set('save_radius', props?.sliderValue || 1)
    props.close()
  }
  const getRadius = async () => {
    props.setSliderValue(await get('save_radius'))
    props.close()
  }
  return (
    <Modal
      isVisible={props.modalVisible}
      style={styles.modal}
      coverScreen={false}
      hasBackdrop={false}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      onSwipeComplete={getRadius}
    >
      <View style={styles.Container}>
        <TouchableOpacity style={styles.ButtonCancel} onPress={getRadius}>
          <Text style={styles.ButtonCancelText}>Huỷ</Text>
        </TouchableOpacity>
        <View style={styles.Row}>
          <View style={{ flex: 8.5 }}>
            <Slider
              maximumValue={100}
              minimumValue={1}
              minimumTrackTintColor='#307ecc'
              maximumTrackTintColor='#000000'
              step={1}
              value={props.sliderValue}
              onValueChange={sliderValue => props.setSliderValue(sliderValue)}
            />
          </View>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.text}>{props.sliderValue} km</Text>
          </View>
        </View>
        <View style={styles.BookNow}>
          <TouchableOpacity style={styles.BookNowButton} onPress={saveRadius}>
            <Text style={styles.ButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 0.3,
    backgroundColor: `#ffffff`,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    color: `#717171`,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '600'
  },
  TextBold: {
    color: `#000000`,
    fontSize: 20,
    marginLeft: 5,
    fontWeight: '600'
  },
  BookNow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  BookNowButton: {
    alignItems: 'center',
    backgroundColor: '#1260DB',
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    width: '100%',
    justifyContent: 'center'
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
  ButtonCancel: {
    marginBottom: 10,
    marginTop: -15,
    marginLeft: -10
  },
  ButtonCancelText: {
    color: 'black',
    fontSize: 15
  }
})
