import Slider from '@react-native-community/slider'
import useCache from 'hooks/useCache'
import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native'
import { category } from '../utils/map/category'
import { Radio, Text } from '@ui-kitten/components'
import Modal from 'react-native-modal'
export default SettingModal = props => {
  const { set, get } = useCache

  const [categoryId, setCategoryId] = useState({
    electric: false,
    device: false,
    car: false,
    furniture: false,
    office: false,
    fashion: false,
    book: false,
    pet: false,
    sport: false,
    baby: false,
    work: false,
    land: false,
    free: false
  })

  const saveRadius = async () => {
    await set('save_radius', props?.sliderValue || 1)
    props.close()
    const listCategory = Object.entries(categoryId)
      .filter(e => e[1])
      .map(e => {
        return category.filter(c => c.type === e[0])[0].id
      })
    props.settingMap(
      props.sliderValue,
      listCategory,
      props.location?.latitude || 21.0541883,
      props.location?.longitude || 105.8263367
    )
    props.setRegion({
      latitude: props.location?.latitude || 21.0541883,
      longitude: props.location?.longitude || 105.8263367,
      latitudeDelta: (Math.PI * props.sliderValue) / 111.045,
      longitudeDelta: 0.01
    })
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
        <View style={{ flex: 0.5 }}>
          <Text style={styles.title}>Tuỳ chỉnh sản phẩm hiển thị</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {category.map((item, i) => {
              return (
                <View style={styles.icon} key={i}>
                  <Radio
                    checked={categoryId[item.type]}
                    onChange={nextChecked =>
                      setCategoryId(prevState => ({
                        ...prevState,
                        [item.type]: nextChecked
                      }))
                    }
                  >
                    <View style={{ justifyContent: 'column' }}>
                      <Image
                        source={{ uri: item.icon }}
                        style={{ width: 40, height: 40 }}
                      />
                      <Text style={styles.categoryName}>{item.name}</Text>
                    </View>
                  </Radio>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Tuỳ chỉnh bán kính</Text>
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

            <Text style={styles.text}>{props.sliderValue} km</Text>
          </View>
          <View style={styles.BookNow}>
            <TouchableOpacity style={styles.BookNowButton} onPress={saveRadius}>
              <Text style={styles.ButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 0.5,
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
  title: {
    marginVertical: 2,
    fontSize: 15,
    fontWeight: 'bold'
  },
  icon: {
    width: 110
  },
  categoryName: {
    fontSize: 12,
    marginVertical: 3
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
    flex: 0.3,
    justifyContent: 'flex-end'
  },
  BookNowButton: {
    alignItems: 'center',
    backgroundColor: '#197CFF',
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
    color: `#000000`,
    fontSize: 14
  }
})
