import { Slider } from '@miblanchard/react-native-slider'
import { Button, Radio, Text } from '@ui-kitten/components'
import { withArray, withNumber, withObject } from 'exp-value'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { category } from 'utils/map/category'
import { styles } from './styles'
import { useSelector } from 'react-redux'

const FilterModal = ({ close, handleSearch, modalVisible }) => {
  const location = useSelector(state =>
    withObject('settingState.location', state)
  )
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
  const [dataSearch, setDataSearch] = useState({
    categoryId: [],
    radius: 1,
    location: {
      lat: location.latitude,
      lng: location.longitude
    },
    price: [1000000, 100000000],
    search: ''
  })

  const _onChange = useCallback(
    (name, value) => {
      setDataSearch(prev => ({ ...prev, [name]: value }))
    },
    [dataSearch]
  )

  const _submit = () => {
    const listCategory = Object.entries(categoryId)
      .filter(e => e[1])
      .map(e => {
        return category.filter(c => c.type === e[0])[0].id
      })

    handleSearch({ ...dataSearch, categoryId: listCategory })
    close()
  }

  const handleClose = () => {
    close()
  }
  return (
    <Modal
      isVisible={modalVisible}
      style={styles.modal}
      coverScreen={true}
      hasBackdrop={true}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      onSwipeComplete={handleClose}
    >
      <View style={styles.Container}>
        <TouchableOpacity style={styles.ButtonCancel} onPress={handleClose}>
          <Text style={styles.ButtonCancelText}>Huỷ</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Danh mục sản phẩm: </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
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
          <Text style={styles.title}>Mở rộng bán kính tìm kiếm</Text>
          <View style={styles.Row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Slider
                animateTransitions
                maximumValue={100}
                minimumValue={1}
                minimumTrackTintColor='#E26740'
                maximumTrackTintColor='#d3d3d3'
                step={1}
                value={withNumber('radius', dataSearch)}
                onValueChange={e => _onChange('radius', e)}
                thumbTintColor='#E26740'
              />
            </View>

            <Text style={styles.title}>
              {withNumber('radius', dataSearch)} km
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Chọn khoảng giá phù hợp:</Text>
          <View style={styles.Row}>
            <Text style={styles.title}>
              {withArray('price', dataSearch)[0] / 1000000 + 'tr'}
            </Text>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Slider
                animateTransitions
                maximumTrackTintColor='#d3d3d3'
                maximumValue={100000000}
                minimumTrackTintColor='#E26740'
                minimumValue={0}
                step={1000000}
                thumbTintColor='#E26740'
                value={withNumber('price', dataSearch)}
                onValueChange={e => _onChange('price', e)}
              />
            </View>
            <Text style={styles.title}>
              {withArray('price', dataSearch)[1] / 1000000 + 'tr'}
            </Text>
          </View>
        </View>
        <View>
          <Button onPress={_submit}>Tìm kiếm</Button>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal
