import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'

const heightImage =
  Platform.OS == 'android' ? 70 : Platform.OS == 'ios' ? 60 : 150
const widthCate = 90
const DEVICE_WIDTH = Dimensions.get('window').width

export default function Category(props) {
  const { navigation } = props
  const [categories, setCategories] = useState([])
  useEffect(() => {
    let newsList = require('../assets/category/category.json')
    setCategories(newsList)
  }, [])

  return (
    <View style={styles.containerCategory}>
      <Text style={styles.categoryTitle}>Danh mục sản phẩm</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.viewCategory}>
          {categories?.map((x, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('News', {
                  screen: 'Search',
                  params: { category: x?.name || 'Tất cả danh mục' }
                })
              }
              key={index}
            >
              <View style={styles.category}>
                <Image style={styles.image} source={{ uri: x.image }} />
                <Text style={styles.titleOfImage}>{x.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    margin: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: widthCate
  },
  titleOfImage: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    height: 40,
    marginTop: 5
  },
  image: {
    width: heightImage,
    height: heightImage
  },
  viewCategory: {
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  categoryTitle: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: '600'
  },
  containerCategory: {
    backgroundColor: '#fff',
    maxWidth: DEVICE_WIDTH,
    height: 4.3 * heightImage,
    maxHeight: 350,
    margin: 0,
    padding: 0
  }
})
