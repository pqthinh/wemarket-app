import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import {
  CategoryItem,
  ImageCategory,
  Title,
  TitleCategory,
  Wrapper,
  WrapperCategory
} from './styled'

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let newsList = require('utils/map/category.json')
    setCategories(newsList)
  }, [])

  return (
    <Wrapper>
      <Title>Danh mục sản phẩm</Title>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <WrapperCategory>
          {categories?.map((x, index) => (
            <TouchableOpacity onPress={() => {}} key={index}>
              <CategoryItem>
                <ImageCategory source={{ uri: x.image }} />
                <TitleCategory>{x.name}</TitleCategory>
              </CategoryItem>
            </TouchableOpacity>
          ))}
        </WrapperCategory>
      </ScrollView>
    </Wrapper>
  )
}
export default React.memo(Category)
