import { getViewProductMap } from 'actions/mapActions'
import useCache from 'hooks/useCache'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
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
  const [location, setLocation] = useState({
    latitude: 21.0369,
    longitude: 105.7823
  })
  const { set, get } = useCache

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [product, setProduct] = useState({
    place: '',
    name: '',
    image: '',
    name_user: '',
    star: '',
    price: ''
  })
  const [radius, setRadius] = useState(1)
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: (Math.PI * radius) / 111.045,
    longitudeDelta: 0.01
  })
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })
  const [openDirection, setOpenDirection] = useState(false)
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

  useEffect(async () => {
    setRadius((await get('save_radius')) || 1)
  }, [])

  useMemo(() => {
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
    dispatch(
      getViewProductMap({
        lat: location.latitude,
        lng: location.longitude,
        distance: distance
      })
    )
  }, [])

  const dispatchSettingMap = useCallback(
    (getRadius, categoryId) =>
      dispatch(
        getViewProductMap({
          lat: location.latitude,
          lng: location.longitude,
          distance: getRadius,
          categoryId: categoryId
        })
      ),
    [dispatch]
  )
  if (loading) {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsUserLocation={true}
        // customMapStyle={customStyleMap}
        maxZoomLevel={17.5}
        enableHighAccuracy={false}
      >
        {listProduct.map((host, i) => {
          if (parseFloat(host.lat) && parseFloat(host.lng)) {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: parseFloat(host.lat),
                  longitude: parseFloat(host.lng)
                }}
                image={{
                  uri: host.iconCategory ? host.iconCategory : null
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
                    price: host.price
                  })
                  setUser({
                    uid: host.uid,
                    displayName: host.username,
                    photoURL: host.avatar
                  })
                  setModalVisible2(false)
                  setCoordinate({
                    latitude: parseFloat(host.lat),
                    longitude: parseFloat(host.lng)
                  })
                  setRegion(prevState => ({
                    ...prevState,
                    latitude: parseFloat(host.lat),
                    longitude: parseFloat(host.lng)
                  }))
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
        <MapView.Circle
          center={{
            latitude: location?.latitude || 21.0541883,
            longitude: location?.longitude || 105.8263367
          }}
          radius={radius * 1000}
          strokeWidth={2}
          strokeColor='#3399ff'
          fillColor='rgba(128,191,255,0.2)'
        />
      </MapView>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          setModalVisible2(true)
          setModalVisible(false)
        }}
      >
        <Ionicons name='options' size={24} color='black' />
      </TouchableOpacity>
      <MapModal
        modalVisible={modalVisible}
        close={close}
        product={product}
        userChat={user}
        setOpenDirection={setOpenDirection}
      />
      <SettingModal
        modalVisible={modalVisible2}
        close={close_2}
        sliderValue={radius}
        setSliderValue={setRadius}
        settingMap={dispatchSettingMap}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
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

export default React.memo(MapScreen)
