import { getListProduct } from 'actions/homeActions'
import Category from 'components/Category'
import ProductItem from 'components/ProductItem'
import WrapperContent from 'components/WrapperContent'
import SliderImage from 'components/SliderImage'
import { withArray, withBoolean, withNumber } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'

import { Divider } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import {
  ScreenContainer,
  Section,
  SectionName,
  ProductContainer
} from './styled'
import { IMAGES } from 'assets'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const listProductState = useSelector(state => {
    return state.listProduct || {}
  })
  const [listProduct, setListProduct] = useState([])
  const [listProductTop, setListProductTop] = useState([...Array(10).keys()])
  const [listProductFav, setListProductFav] = useState([])
  const [listProductSuggestions, setListProductSuggestions] = useState([])

  const [page, setPage] = useState(1)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)

  const handleLoadMoreInListProduct = useCallback(() => {
    if (withNumber('listProduct.total', listProductState) / 10 + 1 <= page)
      return
    dispatch(getListProduct({ offset: page - 1 }))
  }, [page, dispatch, listProductState])

  const handleLoadMoreProductTop = useCallback(() => {
    if (withNumber('listProduct.total', listProductState) / 10 + 1 <= page)
      return
    dispatch(getListProduct({ offset: page - 1 }))
  }, [])

  const handleLoadMoreInProductSuggestions = useCallback(() => {
    if (withNumber('listProduct.total', listProductState) / 10 + 1 <= page)
      return
    dispatch(getListProduct({ offset: page - 1 }))
  }, [])

  const handleLoadMoreInProductFav = useCallback(() => {
    if (withNumber('listProduct.total', listProductState) / 10 + 1 <= page)
      return
    dispatch(getListProduct({ offset: page - 1 }))
  }, [])

  const _onScroll = event => {
    let y = Math.ceil(event.nativeEvent.contentOffset.y)
    let height = Math.round(event.nativeEvent.layoutMeasurement.height)
    let contentHeight = Math.round(event.nativeEvent.contentSize.height)
    if (y + height >= contentHeight) handleLoadMoreInListProduct()
  }

  const _renderFooter = useCallback(() => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1
        }}
      >
        {loadingLoadMore ? (
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        ) : null}
      </View>
    )
  }, [loadingLoadMore])

  const _renderListProduct = useCallback(listProduct => {
    if (listProduct.length < 1) return
    return [...listProduct].map((item, index) => {
      return <ProductItem product={item} key={index + 'listProduct'} />
    })
  }, [])

  useEffect(() => {
    dispatch(getListProduct())
  }, [])

  useEffect(() => {
    const loadListProduct = withArray('listProduct.result', listProductState)
    setLoadingLoadMore(withBoolean('loading', listProductState))
    if (loadListProduct.length > 0) {
      setListProduct([...listProduct, ...loadListProduct])
      setPage(page + 1)
    }
  }, [listProductState])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <ScreenContainer>
        <ScrollView onScroll={_onScroll} scrollEventThrottle={50}>
          <SliderImage />

          <Category />

          <WrapperContent
            name={'Sản phẩm mới'}
            horizontal={true}
            loadMoreAction={() => console.log('Hello world ')}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProductTop}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ _ }) => (
                <ProductItem navigation={navigation} style={{ width: 150 }} />
              )}
              ListFooterComponent={_renderFooter}
              onEndReached={handleLoadMoreProductTop}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <WrapperContent name={'Top tìm kiếm'}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProductSuggestions}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <ProductItem
                  navigation={navigation}
                  style={{ width: 150 }}
                  product={item}
                />
              )}
              ListFooterComponent={_renderFooter}
              onEndReached={handleLoadMoreInProductSuggestions}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <WrapperContent name={'Sản phẩm được yêu thích'}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProductFav}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <ProductItem
                  navigation={navigation}
                  style={{ width: 150 }}
                  product={item}
                />
              )}
              ListFooterComponent={_renderFooter}
              onEndReached={handleLoadMoreInProductFav}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <Section>
            <SectionName>{'Gợi ý hôm nay'}</SectionName>
            <SliderImage images={IMAGES.LIST_PRODUCT} style={{ height: 100 }} />
            <ProductContainer>
              {_renderListProduct(listProduct)}
              {_renderFooter()}
            </ProductContainer>
          </Section>
        </ScrollView>
      </ScreenContainer>
    </SafeAreaView>
  )
}

export default HomeScreen
