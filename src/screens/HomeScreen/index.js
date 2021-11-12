import Category from 'components/Category'
import ProductItem from 'components/ProductItem'
import SliderImage from 'components/SliderImage'
import WrapperContent from 'components/WrapperContent'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { ProductContainer } from './styled'

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SliderImage />

        <Category />

        <WrapperContent name={'Sản phẩm mới'} horizontal={true}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </WrapperContent>

        <WrapperContent name={'Top tìm kiếm'} horizontal={true}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </WrapperContent>

        <WrapperContent name={'Sản phẩm được yêu thích'} horizontal={true}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </WrapperContent>

        <WrapperContent
          name={'Gợi ý hôm nay'}
          stickyHeaderHiddenOnScroll={true}
        >
          <ProductContainer>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </ProductContainer>
        </WrapperContent>
      </ScrollView>
    </SafeAreaView>
  )
}
