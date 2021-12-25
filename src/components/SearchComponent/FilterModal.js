import Slider from '@react-native-community/slider'
import { Radio, Text } from '@ui-kitten/components'
import useCache from 'hooks/useCache'
import React, { useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { category } from 'utils/map/category'
import { styles } from './styles'

const FilterModal = ({
  settingMap,
  setRegion,
  close,
  sliderValue,
  location,
  setSliderValue,
  modalVisible
}) => {
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
    await set('save_radius', sliderValue || 1)
    close()
    const listCategory = Object.entries(categoryId)
      .filter(e => e[1])
      .map(e => {
        return category.filter(c => c.type === e[0])[0].id
      })
    settingMap(
      sliderValue,
      listCategory,
      location?.latitude || 21.0541883,
      location?.longitude || 105.8263367
    )
    setRegion({
      latitude: location?.latitude || 21.0541883,
      longitude: location?.longitude || 105.8263367,
      latitudeDelta: (Math.PI * sliderValue) / 111.045,
      longitudeDelta: 0.01
    })
  }
  const getRadius = async () => {
    setSliderValue(await get('save_radius'))
    close()
  }
  return (
    <Modal
      isVisible={modalVisible}
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
                value={sliderValue}
                onValueChange={sliderValue => setSliderValue(sliderValue)}
              />
            </View>

            <Text style={styles.text}>{sliderValue} km</Text>
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

export default FilterModal
