import useCache from 'hooks/useCache'
import React, { useEffect, useMemo, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapModal from '../../components/MapModal'
import SettingModal from '../../components/SettingModal'
import { GOOGLE_MAPS_API_KEY } from '../../utils/map/constants'
import products from './data'
const MapScreen = () => {
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
    latitude: null,
    longitude: null
  })
  const [openDirection, setOpenDirection] = useState(false)

  const close = () => {
    setModalVisible(false)
  }
  const close_2 = () => {
    setModalVisible2(false)
  }
  useEffect(async () => {
    setRadius(await get('save_radius'))
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
        setRegion(prevState => ({
          ...prevState,
          latitude: latitude,
          longitude: longitude
        }))
      },
      error => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      {/* {location && ( */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        //region={region}
        //onRegionChangeComplete={region => setRegion(region)}

        showsIndoors={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsScale={true}
        showsBuildings={true}
        showsCompass={true}
        showsUserLocation={true}
        // customMapStyle={customStyleMap}
        paddingAdjustmentBehavior='automatic'
        showsMyLocationButton={true}
        showsBuildings={true}
        maxZoomLevel={17.5}
        loadingEnabled={true}
      >
        {products.map((host, i) => {
          if (host.place.latitude && host.place.longitude) {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: host.place.latitude,
                  longitude: host.place.longitude
                }}
                image={{
                  uri: 'https://i.ibb.co/6DxQH3t/ic-phone.png'
                }}
                title={host.name_product}
                pinColor={'#ffd1dc'}
                onPress={() => {
                  setModalVisible(true)
                  setProduct({
                    place: host.place.name,
                    name: host.name_product,
                    image: host.product_images[0],
                    name_user: host.name_user,
                    star: host.star,
                    price: host.price
                  })
                  setModalVisible2(false)
                  setCoordinate({
                    latitude: host.place.latitude,
                    longitude: host.place.longitude
                  })
                  setRegion(prevState => ({
                    ...prevState,
                    latitude: host.place.latitude,
                    longitude: host.place.longitude
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
        setOpenDirection={setOpenDirection}
      />
      <SettingModal
        modalVisible={modalVisible2}
        close={close_2}
        sliderValue={radius}
        setSliderValue={setRadius}
      />
      {/* )} */}
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

export default MapScreen
