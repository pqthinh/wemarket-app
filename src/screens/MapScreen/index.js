import { getViewProductMap } from 'actions/mapActions'
import useCache from 'hooks/useCache'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import MapModal from 'components/MapModal'
import SettingModal from 'components/SettingModal'
import { GOOGLE_MAPS_API_KEY } from 'utils/map/constants'
import { withArray } from 'exp-value'
import { renderRightActions } from 'components/Header'
import { TopNavigation, Layout, Text } from '@ui-kitten/components'
import Toast from 'react-native-toast-message'

const MapScreen = () => {
  const dispatch = useDispatch()
  const listProductReducer = useSelector(state => {
    return state.listProductMapFilter
  })
  const [user, setUser] = useState({
    uid: '',
    displayName: '',
    photoURL: ''
  })
  const [listProduct, setListProduct] = useState([])

  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const { set, get } = useCache

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [product, setProduct] = useState({
    place: '',
    name: '',
    image: '',
    name_user: '',
    star: '',
    price: '',
    id: ''
  })
  const [radius, setRadius] = useState(null)
  const [region, setRegion] = useState({
    latitude: 21.0541883,
    longitude: 105.8263367,
    latitudeDelta: (Math.PI * radius) / 111.045,
    longitudeDelta: 0.01
  })
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })
  const [openDirection, setOpenDirection] = useState(false)
  const mapRef = React.createRef()
  const [isMapReady, setIsMapReady] = useState(false)
  const [marginTop, setMarginTop] = useState(1)
  const [saveBookMark, setSaveBookMark] = useState()

  const handleLocationPermission = async () => {
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
  }
  const close = () => {
    setModalVisible(false)
  }
  const close_2 = () => {
    setModalVisible2(false)
  }

  useEffect(() => {
    handleLocationPermission()
  }, [])

  // useEffect(async () => {
  //   setRadius(await get('save_radius'))
  // }, [])

  useEffect(() => {
    setRegion(prevState => ({
      ...prevState,
      latitudeDelta: (Math.PI * radius) / 111.045
    }))
  }, [radius])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position)
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setLoading(false)
        setRegion(prevState => ({
          ...prevState,
          latitude: latitude,
          longitude: longitude
        }))
      },
      error => {
        console.log(error.code, error.message)
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])

  useEffect(() => {
    if (listProductReducer) {
      setListProduct(withArray('listViewProductMap.result', listProductReducer))
    }
  }, [listProductReducer])

  useEffect(async () => {
    const distance = (await get('save_radius')) || 1
    setRadius(distance)
    dispatch(
      getViewProductMap({
        lat: location.latitude,
        lng: location.longitude,
        distance: distance
      })
    )
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
    [dispatch]
  )
  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: 'Bài viết đã được lưu' + '  👋'
    })
  }
  if (loading) {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Layout>
        <TopNavigation
          alignment='center'
          title={() => (
            <Text style={{ fontSize: 20, color: 'black' }}>Bản đồ</Text>
          )}
          accessoryRight={renderRightActions}
          //style={{ backgroundColor: '#F2F3F7' }}
        />
      </Layout>
      <SafeAreaView style={{ flex: 2, paddingBottom: '30%' }}>
        <StatusBar barStyle='dark-content' />

        <MapView
          ref={mapRef}
          style={{
            ...styles.map,
            marginTop: marginTop
          }}
          provider={PROVIDER_GOOGLE}
          region={region}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          showsUserLocation={true}
          // customMapStyle={customStyleMap}
          maxZoomLevel={17.5}
          enableHighAccuracy={false}
          //onMapReady={onMapReady}
        >
          {listProduct.map((host, i) => {
            if (
              parseFloat(host.lat) &&
              parseFloat(host.lng) &&
              host.iconCategory
            ) {
              return (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: parseFloat(host.lat),
                    longitude: parseFloat(host.lng)
                  }}
                  image={{
                    uri: host?.iconCategory || null
                  }}
                  title={host.name}
                  pinColor={'#ffd1dc'}
                  onPress={() => {
                    setModalVisible(true)
                    setProduct({
                      place: host.address,
                      name: host.name,
                      image: host.image,
                      name_user: host.username,
                      //star: host.star,
                      price: host.price,
                      id: host.id
                    })
                    setUser({
                      uid: host.uid,
                      username: host.username,
                      avatar: host.avatar
                    })
                    setModalVisible2(false)
                    setCoordinate({
                      latitude: parseFloat(host.lat),
                      longitude: parseFloat(host.lng)
                    })
                    setRegion({
                      latitude: parseFloat(host.lat),
                      longitude: parseFloat(host.lng),
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.01
                    })
                    setOpenDirection(false)
                  }}
                />
              )
            }
          })}
          {openDirection && (
            <MapViewDirections
              origin={location}
              destination={coordinate}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor='#197CFF'
            />
          )}
          {coordinate.latitude !== null && <Marker coordinate={coordinate} />}
          {region && (
            <MapView.Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              radius={radius * 1000}
              strokeWidth={2}
              strokeColor='#3399ff'
              fillColor='rgba(128,191,255,0.2)'
            />
          )}
        </MapView>
        <Toast
          position='top'
          topOffset={50}
          style={{ marginEnd: 50, marginLeft: 10, marginTop: -50 }}
          ref={ref => Toast.setRef(ref)}
        />
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setModalVisible2(true)
            setModalVisible(false)
          }}
        >
          <Ionicons name='options' size={24} color='black' />
        </TouchableOpacity>
      </SafeAreaView>

      <MapModal
        modalVisible={modalVisible}
        close={close}
        product={product}
        userChat={user}
        setOpenDirection={setOpenDirection}
        //setSaveBookMark={setSaveBookMark}
        showToast={showToast}
      />
      <SettingModal
        modalVisible={modalVisible2}
        close={close_2}
        sliderValue={radius}
        setSliderValue={setRadius}
        location={region}
        setRegion={setRegion}
        settingMap={dispatchSettingMap}
      />
    </View>
  )
}

export default React.memo(MapScreen)
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  },
  map: {
    flex: 1
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    position: 'absolute',
    top: 60,
    right: 13.5,
    width: 37,
    height: 36,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  }
})
