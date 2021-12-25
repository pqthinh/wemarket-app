import { useNavigation } from '@react-navigation/native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { getListProduct } from 'actions/homeActions'
import { getViewProductMap } from 'actions/mapActions'
import { historySearch, toggleBottom } from 'actions/userActions'
import { IMAGES } from 'assets'
import ProductItem from 'components/ProductItem'
import SearchComponent from 'components/SearchComponent'
import FilterModal from 'components/SearchComponent/FilterModal'
import SliderImage from 'components/SliderImage'
import { withArray, withBoolean, withNumber, withObject } from 'exp-value'
import { useDebounce } from 'hooks'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ProductContainer, Section, SectionName } from './styled'
import { styles } from './styles'

const SearchScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const listProductState = useSelector(state => {
    return state.listProduct
  })
  const setting = useSelector(state => {
    return state.settingState
  })
  const [loadingLoadMore, setLoadingLoadMore] = useState(false)
  const [page, setPage] = useState(1)
  const [listProduct, setListProduct] = useState([])
  const [search, setSearch] = useState('')
  const searchInput = useDebounce(search, 3000)
  const [filterModal, setFilterModal] = useState(false)
  const [radius, setRadius] = useState(null)
  const [region, setRegion] = useState({
    latitude: location?.latitude || 21.0541883,
    longitude: location?.longitude || 105.8263367,
    latitudeDelta: (Math.PI * radius) / 111.045,
    longitudeDelta: 0.01
  })

  const handleLoadMoreInListProduct = useCallback(() => {
    const location = withObject('location', setting)
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
  }, [page, setting.location, listProductState.listProduct])

  const _onScroll = event => {
    let y = Math.ceil(event.nativeEvent.contentOffset.y)
    let height = Math.round(event.nativeEvent.layoutMeasurement.height)
    let contentHeight = Math.round(event.nativeEvent.contentSize.height)
    if (y + height >= contentHeight) handleLoadMoreInListProduct()
  }

  const _renderFooter = useCallback(() => {
    return (
      <View style={styles.loading}>
        {loadingLoadMore ? (
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        ) : null}
      </View>
    )
  }, [loadingLoadMore])

  const _renderListProduct = useCallback(listProduct => {
    if (listProduct.length < 1)
      return <Text style={styles.noData}>Không tìm thấy sản phẩm phù hợp</Text>
    return [...listProduct].map((item, index) => {
      return <ProductItem product={item} key={index + 'listProduct'} />
    })
  }, [])
  const dispatchSettingMap = useCallback(
    (getRadius, categoryId, lat, lng) =>
      dispatch(
        getViewProductMap({
          lat: lat || 21.0541883,
          lng: lng || 105.8263367,
          distance: getRadius,
          categoryId: categoryId
        })
      ),
    []
  )

  useEffect(() => {
    dispatch(toggleBottom(true))
  }, [])

  useEffect(() => {
    console.log(searchInput, 'searchInput')
    dispatch(historySearch(searchInput))
  }, [searchInput])

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
      <View style={styles.container}>
        <Layout level='3'>
          <TopNavigation
            alignment='center'
            accessoryLeft={
              <TopNavigationAction
                icon={<Icon name='arrow-back' fill='#E26740' />}
                onPress={() => {
                  dispatch(toggleBottom(false))
                  navigation.goBack()
                }}
              />
            }
            accessoryRight={
              <TopNavigationAction
                icon={<Icon name='funnel' fill='#E26740' style={styles.icon} />}
                onPress={() => setFilterModal(true)}
              />
            }
            title={() => (
              <SearchComponent value={search} onChangeData={setSearch} />
            )}
          />
        </Layout>
        <Divider />
        <ScrollView onScroll={_onScroll} scrollEventThrottle={50}>
          <Section style={{ paddingBottom: 40 }}>
            <SliderImage images={IMAGES.LIST_PRODUCT} style={{ height: 120 }} />
            <SectionName>{'Kết quả tìm kiếm'}</SectionName>
            <ProductContainer>
              {_renderListProduct(listProduct)}
              <Divider />
              {_renderFooter()}
            </ProductContainer>
          </Section>
        </ScrollView>

        <FilterModal
          modalVisible={filterModal}
          close={() => setFilterModal(false)}
          sliderValue={radius}
          setSliderValue={setRadius}
          location={location}
          setRegion={setRegion}
          settingMap={dispatchSettingMap}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen
