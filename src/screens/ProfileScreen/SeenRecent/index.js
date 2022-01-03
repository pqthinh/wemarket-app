import { Layout, Text } from '@ui-kitten/components'
import { getSeenRecent } from 'actions/SeenRecentActions'
import ProductItem from 'components/ProductItem'
import { withEmpty } from 'exp-value'
import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const SeenRecentScreen = () => {
  const dispatch = useDispatch()
  const userReducer = useSelector(state => {
    return state.userState
  })
  const seenRecentReducer = useSelector(state => {
    return state.listProductSeenRecent
  })
  useEffect(() => {
    dispatch(getSeenRecent(withEmpty('userInfo.uid', userReducer)))
  }, [])

  if (seenRecentReducer.loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.spinnerView}>
          <ActivityIndicator size='large' color='#E26740' />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {seenRecentReducer.listSeenRecent != [] ? (
        <Layout style={styles.container}>
          <FlatList
            data={seenRecentReducer.listSeenRecent}
            numColumns={2}
            //inverted={true}
            renderItem={({ item, key }) => (
              <ProductItem product={item} index={key} />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </Layout>
      ) : (
        <Layout style={styles.container}>
          <Image source={require('images/no-post.jpg')} style={styles.image} />
          <Text category='h6' style={styles.textBookmark}>
            Bạn chưa xem sản phẩm nào
          </Text>
        </Layout>
      )}
    </SafeAreaView>
  )
}
export default SeenRecentScreen
const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  textBookmark: {
    textAlign: 'center'
  },
  image: {
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 3,
    resizeMode: 'contain',
    marginTop: Dimensions.get('screen').height / 6
  }
})
