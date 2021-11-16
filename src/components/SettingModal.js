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
import { Radio, Text } from '@ui-kitten/components'
import Modal from 'react-native-modal'
export default SettingModal = props => {
  const { set, get } = useCache
  const [electric, setElectric] = useState(false)
  const [car, setCar] = useState(false)
  const [land, setLand] = useState(false)
  const [fashion, setFashion] = useState(false)
  const [book, setBook] = useState(false)
  const [furniture, setFurniture] = useState(false)
  const [office, setOffice] = useState(false)
  const [pet, setPet] = useState(false)
  const [baby, setBaby] = useState(false)
  const [sport, setSport] = useState(false)
  const [work, setWork] = useState(false)
  const [free, setFree] = useState(false)
  const [device, setDevice] = useState(false)
  const saveRadius = async () => {
    const getRadius = await set('save_radius', props?.sliderValue || 1)
    props.close()
    props.settingMap(props.sliderValue)
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
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Tuỳ chỉnh sản phẩm hiển thị</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.icon}>
              <Radio
                checked={electric}
                onChange={nextChecked => setElectric(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/6DxQH3t/ic-phone.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Điện tử</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={device}
                onChange={nextChecked => setDevice(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/HnQfd2y/ic-kitchen.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Thiết bị</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={car}
                onChange={nextChecked => setCar(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/mtTmRD0/ic-car.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Xe cộ & phụ tùng</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={furniture}
                onChange={nextChecked => setFurniture(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/n7XZD7z/ic-seat.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Nội thất</Text>
                </View>
              </Radio>
            </View>

            <View style={styles.icon}>
              <Radio
                checked={office}
                onChange={nextChecked => setOffice(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/fn0bKkd/ic-print.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Văn phòng</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={fashion}
                onChange={nextChecked => setFashion(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/sFcG9mV/ic-fashion.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Quần áo & phụ kiện</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={book}
                onChange={nextChecked => setBook(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/L6dx79J/ic-book.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Sách, phim & nhạc</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={pet}
                onChange={nextChecked => setPet(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/XSJcjXh/ic-pet.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Thú cưng</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={sport}
                onChange={nextChecked => setSport(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/V3q4gfg/ic-sport.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Đồ chơi & thể thao</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={baby}
                onChange={nextChecked => setBaby(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/fXsHb7Z/ic-baby.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Mẹ & bé</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={land}
                onChange={nextChecked => setLand(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/Kh6s34s/ic-house.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Nhà đất</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={work}
                onChange={nextChecked => setWork(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/sPnTPDM/ic-work.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Việc làm</Text>
                </View>
              </Radio>
            </View>
            <View style={styles.icon}>
              <Radio
                checked={free}
                onChange={nextChecked => setFree(nextChecked)}
              >
                <View style={{ justifyContent: 'column' }}>
                  <Image
                    source={{ uri: 'https://i.ibb.co/tzRVhCk/ic-free.png' }}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text style={styles.categoryName}>Cho tặng</Text>
                </View>
              </Radio>
            </View>
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
    flex: 0.4,
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
    marginVertical: 5,
    fontSize: 16,
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
    color: `#000000`,
    fontSize: 14
  }
})
