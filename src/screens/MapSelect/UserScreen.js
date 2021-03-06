import {
  Text,
  TopNavigationAction,
  TopNavigation,
  Layout,
  Icon
} from '@ui-kitten/components'
import { useShowState } from 'core/hooks'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native'
import Geocoder from 'react-native-geocoding'
import Geolocation from 'react-native-geolocation-service'
import MapView from 'react-native-maps'
import FeatherIcon from 'react-native-vector-icons/Feather'
import SearchAddressModal from 'components/SearchAddressModal'
import { usePlace } from 'context/PlacesManager'
import { GOOGLE_MAPS_API_KEY } from 'utils/map/constants'
import styles from './styled'
import { getLocation, toggleBottom } from 'actions/userActions'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'vi' })
const UserScreen = () => {
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState(null)
  const { place, dispatchPlace } = usePlace()
  const {
    place: { currentPlace }
  } = usePlace()

  const [marginTop, setMarginTop] = useState(1)
  const [userLocation, setUserLocation] = useState(place)
  const [regionChangeProgress, setRegionChangeProgress] = useState(false)
  const [error, setError] = useState(null)
  const [isModalVisible, togglePlaceModal] = useShowState()
  const [newAddress, setNewAddress] = useState(null)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const mapRef = React.createRef()

  useEffect(() => {
    dispatch(toggleBottom(true))
  }, [])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }
        setRegion(region)
        fetchAddress(region.latitude, region.longitude)

        setLoading(false)
        setError(null)
      },
      error => {
        console.log(error)
        setError(error.message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        showLocationDialog: true,
        timeout: 15000,
        maximumAge: 0
      }
    )
  }, [dispatchPlace])

  const onMapReady = () => {
    setMarginTop(0)
    mapRef.current.animateToRegion({
      latitude: currentPlace.latitude,
      longitude: currentPlace.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    })
  }
  const onPressMap = e => {
    const { latitude, longitude } = e.nativeEvent.coordinate
    Geocoder.from({
      latitude,
      longitude
    }).then(res => {
      const {
        formatted_address,
        place_id,
        geometry: {
          location: { lat, lng }
        }
      } = res.results[0]

      dispatchPlace({
        type: 'SET_CURRENT_PLACE',
        description: formatted_address,
        placeId: place_id,
        latitude: lat,
        longitude: lng
      })
    })
  }
  // Fetch location details as a JSON from google map API
  const fetchAddress = (latitude, longitude) => {
    Geocoder.from({
      latitude,
      longitude
    }).then(res => {
      const {
        formatted_address,
        place_id,
        geometry: {
          location: { lat, lng }
        }
      } = res.results[0]

      dispatchPlace({
        type: 'SET_CURRENT_PLACE',
        description: formatted_address,
        placeId: place_id,
        latitude: lat,
        longitude: lng,
        address: formatted_address
      })
      setRegionChangeProgress(false)
    })
  }

  const onLocationSelect = () => {
    dispatch(getLocation(currentPlace))
    dispatch(toggleBottom(false))
    navigation.goBack()
  }

  if (loading) {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Layout level='3'>
          <TopNavigation
            accessoryLeft={
              <TopNavigationAction
                icon={<Icon name='arrow-back' />}
                onPress={() => {
                  dispatch(toggleBottom(false))
                  navigation.goBack()
                }}
              />
            }
            title={evaProps => (
              <Text style={{ fontWeight: '700', fontSize: 18 }} {...evaProps}>
                Ch???n v??? tr??
              </Text>
            )}
          />
        </Layout>
        <SafeAreaView style={{ flex: 2, height: '50%' }}>
          {!!region.latitude && !!region.longitude && (
            <MapView
              style={{
                ...styles.map,
                marginTop: marginTop
              }}
              ref={mapRef}
              region={{
                latitude: currentPlace?.latitude || 21.0369,
                longitude: currentPlace?.longitude || 105.7823,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
              showsUserLocation={true}
              onMapReady={onMapReady}
              onPress={onPressMap}
              onPoiClick={onPressMap}
            >
              <MapView.Marker
                coordinate={{
                  latitude: currentPlace?.latitude || 21.0369,
                  longitude: currentPlace?.longitude || 105.7823
                }}
                title={'V??? tr?? c???a b???n'}
                draggable
              />
            </MapView>
          )}
        </SafeAreaView>
        <View style={styles.detailSection}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'roboto',
                marginBottom: 20
              }}
            >
              Ch???n v??? tr?? tr??n b???n ?????
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 'auto' }}
              onPress={togglePlaceModal}
            >
              <FeatherIcon name='search' size={20} color='#000' />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: '#999'
            }}
          >
            V??? TR??
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              paddingVertical: 10,
              borderBottomColor: 'silver',
              borderBottomWidth: 0.5
            }}
          >
            {!regionChangeProgress
              ? currentPlace.description
              : '??ang l???y v??? tr??...'}
          </Text>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: '#E26740' }]}
            onPress={onLocationSelect}
          >
            <Text style={styles.ButtonText}>L???y v??? tr?? t???i ????y</Text>
          </TouchableOpacity>
        </View>
        <SearchAddressModal
          isModalVisible={isModalVisible}
          toggleModal={togglePlaceModal}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          currentPlace={userLocation}
        />
      </View>
    )
  }
}
export default UserScreen
