import {
  getListProduct,
  getNewProduct,
  getTopViewProduct
} from 'actions/homeActions'
import { getLocation, toggleBottom } from 'actions/userActions'
import Category from 'components/Category'
import ProductItem from 'components/ProductItem'
import WrapperContent from 'components/WrapperContent'
import SliderImage from 'components/SliderImage'
import { withArray, withBoolean, withNumber, withEmpty } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import { renderRightActions } from 'components/Header'
import { TopNavigation, Layout, Divider, Button } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import {
  ScreenContainer,
  Section,
  SectionName,
  ProductContainer
} from './styled'
import { IMAGES } from 'assets'
import { useNavigation } from '@react-navigation/native'
import SearchComponent from 'components/SearchComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = ({}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const listProductState = useSelector(state => {
    return state.listProduct || {}
  })
  const listTopProductState = useSelector(state => {
    return state.listTopViewProduct || {}
  })
  const listNewProductState = useSelector(state => {
    return state.listNewProduct || []
  })
  const setting = useSelector(state => {
    return state.settingState
  })
  const [listProduct, setListProduct] = useState([])
  const [listProductTop, setListProductTop] = useState([])
  const [listProductFav, setListProductFav] = useState([])
  const [listProductSuggestions, setListProductSuggestions] = useState([])
  const [page, setPage] = useState(2)
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)
  const [location, setLocation] = useState(null)

  const handleLocationPermission = useCallback(async () => {
    let permissionCheck = ''
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        )
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        )
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.')
      }
    }
  }, [])

  const handleLoadMoreInListProduct = useCallback(() => {
    if (
      withNumber('listProduct.total', listProductState) / 10 + 1 <= page ||
      !location
    )
      return
    dispatch(
      getListProduct({
        offset: page - 1,
        lat: location.latitude,
        lng: location.longitude
      })
    )
  }, [page, dispatch, location, listProductState.listProduct])

  const handleLoadMoreProductTop = useCallback(() => {
    if (
      withNumber('listProduct.total', listProductState) / 10 + 1 <= page ||
      !location
    )
      return
    dispatch(
      getListProduct({
        offset: page - 1,
        lat: location.latitude,
        lng: location.longitude
      })
    )
  }, [listProductState.listProduct, page, location])

  const handleLoadMoreInProductSuggestions = useCallback(() => {
    if (
      withNumber('listProduct.total', listProductState) / 10 + 1 <= page ||
      !location
    )
      return
    dispatch(
      getListProduct({
        offset: page - 1,
        lat: location.latitude,
        lng: location.longitude
      })
    )
  }, [listProductState.listProduct, page, location])

  const handleLoadMoreInProductFav = useCallback(() => {
    if (
      withNumber('listProduct.total', listProductState) / 10 + 1 <= page ||
      !location
    )
      return
    dispatch(
      getListProduct({
        offset: page - 1,
        lat: location.latitude,
        lng: location.longitude
      })
    )
  }, [listProductState.listProduct, page, location])

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
    handleLocationPermission()
  }, [])

  useEffect(() => {
    dispatch(toggleBottom(false))
  }, [navigation])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        dispatch(getLocation({ latitude, longitude }))
        setLocation({ latitude, longitude })
      },
      error => {},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])

  useEffect(() => {
    if (!location) return
    dispatch(
      getNewProduct({
        lat: location.latitude,
        lng: location.longitude,
        range: 100
      })
    )
    dispatch(
      getTopViewProduct({
        lat: location.latitude,
        lng: location.longitude,
        range: 100
      })
    )
    dispatch(
      getListProduct({
        offset: 0,
        lat: location.latitude,
        lng: location.longitude,
        range: 100
      })
    )
  }, [location])
  useEffect(() => {
    setListProductFav(
      withArray('listTopViewProduct.result', listTopProductState)
    )
    setListProductSuggestions(
      withArray('listTopViewProduct.result', listTopProductState)
    )
  }, [listTopProductState])
  useEffect(() => {
    setListProductTop(withArray('listNewProduct.result', listNewProductState))
  }, [listNewProductState])

  useEffect(() => {
    const loadListProduct = withArray('listProduct.result', listProductState)
    setLoadingLoadMore(withBoolean('loading', listProductState))
    if (page == 1) {
      setListProduct(loadListProduct)
      return
    }
    if (loadListProduct.length > 0) {
      setListProduct([...listProduct, ...loadListProduct])
      setPage(page + 1)
    }
  }, [listProductState.listProduct])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          accessoryLeft={() => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <SearchComponent
                onPressIn={() => navigation.navigate('Search')}
              />
            </TouchableOpacity>
          )}
          accessoryRight={renderRightActions}
        />
      </Layout>
      <Divider />
      <ScreenContainer>
        <ScrollView onScroll={_onScroll} scrollEventThrottle={50}>
          <SliderImage />

          <Category />

          <WrapperContent name={'Sản phẩm mới'} horizontal={true}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={listProductTop}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <ProductItem style={{ width: 150 }} product={item} />
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
                <ProductItem style={{ width: 150 }} product={item} />
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
                <ProductItem style={{ width: 150 }} product={item} />
              )}
              ListFooterComponent={_renderFooter}
              onEndReached={handleLoadMoreInProductFav}
              onEndReachedThreshold={0.5}
            />
          </WrapperContent>

          <Button
            onPress={() => {
              navigation.navigate('FilterHome')
            }}
          >
            Vị trí hiện tại:{' '}
            {withEmpty('location.latitude', setting) +
              ', ' +
              withEmpty('location.longitude', setting) +
              '| ' +
              (withEmpty('radius', setting) || 10 + 'km')}
          </Button>

          <Section style={{ paddingBottom: 40 }}>
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
