import { getListProduct } from 'actions/homeActions'
import Category from 'components/Category'
import ProductItem from 'components/ProductItem'
import WrapperContent from 'components/WrapperContent'
import { withArray, withBoolean, withNumber } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native'
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = ({}) => {
  const dispatch = useDispatch()
  const listProductState = useSelector(state => {
    return state.listProduct || {}
  })
  const [listProduct, setListProduct] = useState([])
  const [page, setPage] = useState(1)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)

  const handleLoadMoreInListProduct = useCallback(() => {
    if (withNumber('listProduct.total', listProductState) / 10 + 1 <= page)
      return
    dispatch(getListProduct({ offset: page - 1 }))
  }, [page, dispatch, listProductState])

  const renderFooter = useCallback(() => {
    return (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        {loadingLoadMore ? (
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        ) : null}
      </View>
    )
  }, [loadingLoadMore])

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
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ScrollView>
          {/* <SliderImage /> */}

          <Category />

          <WrapperContent
            name={'Sản phẩm mới'}
            horizontal={true}
            loadMoreAction={() => console.log('Hello world ')}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[...Array(10).keys()]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ _ }) => <ProductItem style={{ width: 150 }} />}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMoreInListProduct}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <WrapperContent name={'Top tìm kiếm'}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProduct}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ProductItem style={{ width: 150 }} product={item} />
              )}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMoreInListProduct}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <WrapperContent name={'Sản phẩm được yêu thích'}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProduct}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ProductItem style={{ width: 150 }} product={item} />
              )}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMoreInListProduct}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          {/* Get all product */}
          <WrapperContent
            name={'Gợi ý hôm nay'}
            stickyHeaderHiddenOnScroll={true}
          >
            <FlatList
              numColumns={2}
              data={listProduct}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <ProductItem product={item} />}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMoreInListProduct}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  )
}

export default HomeScreen
