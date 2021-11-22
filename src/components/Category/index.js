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
import { category } from 'utils/map/category.js'

const Category = () => {
  return (
    <Wrapper>
      <Title>Danh mục sản phẩm</Title>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <WrapperCategory>
          {[...category]?.map((x, index) => (
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
