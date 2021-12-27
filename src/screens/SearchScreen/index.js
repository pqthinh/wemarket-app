import { useNavigation } from '@react-navigation/native'
import {
  Divider,
  Icon,
  Layout,
  Select,
  SelectItem,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { searchProduct } from 'actions/productActions'
import { historySearch, toggleBottom } from 'actions/userActions'
import { IMAGES } from 'assets'
import ProductItem from 'components/ProductItem'
import SearchComponent from 'components/SearchComponent'
import FilterModal from 'components/SearchComponent/FilterModal'
import SliderImage from 'components/SliderImage'
import { withArray, withEmpty, withNumber } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SectionName } from './styled'
import { styles } from './styles'

const SearchScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const listProductState = useSelector(state => {
    return state.listProduct
  })
  const resultSearch = useSelector(state => {
    return state.resSearchProduct
  })
  const [listProduct, setListProduct] = useState(
    withArray('listProduct.result', listProductState)
  )
  const [searchInput, setSearchInput] = useState('')

  const [filterModal, setFilterModal] = useState(false)
  const [loadingMore, setLoadingMore] = useState(true)
  const [selectedIndex, setSelectedIndex] = React.useState()
  const [selectedSort, setSelectedSort] = React.useState()
  const [fieldSort, setFieldSort] = useState('')
  const [sort, setSort] = useState('')
  const typeSort = React.useMemo(() => {
    return [
      { id: 'desc', title: 'Giảm dần' },
      { id: 'asc', title: 'Tăng dần' }
    ]
  }, [])
  const type = React.useMemo(() => {
    return [
      { id: 'orderByDate', title: 'Ngày đăng sản phẩm' },
      { id: 'orderByPrice', title: 'Giá sản phẩm' },
      { id: 'orderByLike', title: 'Giá sản phẩm' },
      { id: 'orderByView', title: 'Số lượt xem' }
    ]
  }, [])
  const [condition, setCondition] = useState()

  const combine = useCallback(
    data => {
      setCondition({
        search: searchInput,
        categoryId: withArray('categoryId', data),
        minPrice: withArray('price', data)[0],
        maxPrice: withArray('price', data)[1],
        distance: withNumber('radius', data)[0],
        lat: withEmpty('location.lat', data),
        lng: withEmpty('location.lng', data),
        [fieldSort.id]: sort.id
      })
    },
    [searchInput, fieldSort, sort]
  )

  const _renderFooter = useCallback(() => {
    return (
      <View style={{ flex: 1, width: 350, justifyContent: 'center' }}>
        {loadingMore ? (
          <ActivityIndicator color='#E26740' style={{ margin: 15 }} />
        ) : null}
      </View>
    )
  }, [loadingMore])

  useEffect(() => {
    return () => dispatch(toggleBottom(false))
  }, [])

  useEffect(() => {
    dispatch(toggleBottom(true))
    console.log(searchInput, 'searchInput')
    if (searchInput) {
      dispatch(historySearch(searchInput))
      dispatch(searchProduct({ search: searchInput }))
    }
  }, [searchInput])

  useEffect(() => {
    console.log(resultSearch)
    if (condition || searchInput)
      setListProduct(withArray('products', resultSearch))
  }, [resultSearch.products])

  useEffect(() => {
    console.log(condition, 'condition')
    if (condition) dispatch(searchProduct(condition))
  }, [condition])

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
              <SearchComponent
                init={searchInput}
                onChangeData={setSearchInput}
                onSearch={e => dispatch(searchProduct(e))}
              />
            )}
          />
        </Layout>
        <Divider />
        <Layout style={{ marginVertical: 10, paddingHorizontal: 10 }}>
          <View style={styles.Row}>
            <Select
              selectedIndex={selectedIndex}
              value={withEmpty('title', fieldSort)}
              onSelect={item => {
                setSelectedIndex(item)
                setFieldSort(type[item.row])
              }}
              label={() => <Text style={styles.title}>Sắp xếp</Text>}
              placeholder='Sắp xếp'
              style={{ flex: 1, marginRight: 10 }}
            >
              {type.map((item, index) => {
                return <SelectItem key={index} title={item.title} />
              })}
            </Select>

            <Select
              selectedIndex={selectedSort}
              value={withEmpty('title', sort)}
              onSelect={item => {
                setSelectedSort(item)
                setSort(typeSort[item.row])
              }}
              label={() => <Text style={styles.title}>Thứ tự</Text>}
              placeholder='Thứ tự'
              style={{ flex: 1, marginLeft: 10 }}
            >
              {typeSort.map((item, index) => {
                return <SelectItem key={index} title={item.title} />
              })}
            </Select>
          </View>
        </Layout>
        <Layout style={{ flex: 1, marginBottom: 60 }}>
          <FlatList
            data={listProduct}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
            ListHeaderComponent={() => (
              <>
                <SliderImage
                  images={IMAGES.LIST_PRODUCT}
                  style={{ height: 120 }}
                />
                <SectionName>{'Kết quả tìm kiếm'}</SectionName>
              </>
            )}
            renderItem={({ item, key }) => (
              <ProductItem product={item} index={key} />
            )}
            ListFooterComponent={_renderFooter}
            ListEmptyComponent={() => (
              <Text style={styles.noData}>Không tìm thấy sản phẩm phù hợp</Text>
            )}
            keyExtractor={(_, index) => index.toString()}
            initialNumToRender={5}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              setLoadingMore(false)
            }}
          />
        </Layout>

        <FilterModal
          modalVisible={filterModal}
          close={() => setFilterModal(false)}
          handleSearch={e => combine(e)}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen
