import { Text } from '@ui-kitten/components'
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
import SearchAddressModal from '../../components/SearchAddressModal'
import { usePlace } from '../../context/PlacesManager'
import { GOOGLE_MAPS_API_KEY } from '../../utils/map/constants'
import styles from './styled'

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'vi' })
const UserScreen = () => {
  const [loading, setLoading] = useState(true)
  const [region, setRegion] = useState(null)
  const { place, dispatchPlace } = usePlace()
  const {
    place: { currentPlace }
  } = usePlace()
  const [isMapReady, setIsMapReady] = useState(false)
  const [marginTop, setMarginTop] = useState(1)
  const [userLocation, setUserLocation] = useState('')
  const [regionChangeProgress, setRegionChangeProgress] = useState(false)
  const [error, setError] = useState(null)
  const [isModalVisible, togglePlaceModal] = useShowState()
  const [newAddress, setNewAddress] = useState(null)
  const mapRef = React.createRef()
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
    setIsMapReady(true)
    // setTimeout(() => map.Mapview.animateToRegion(region), 10)
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
      //setUserLocation(formatted_address)

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
      //setUserLocation(formatted_address)

      dispatchPlace({
        type: 'SET_CURRENT_PLACE',
        description: formatted_address,
        placeId: place_id,
        latitude: lat,
        longitude: lng
      })
      setRegionChangeProgress(false)
    })
    // fetch(`https://geocode.xyz/${region.latitude},${region.longitude}?geoit=json`
    // )
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     console.log(responseJson)
    //     let userLocation;
    //     if(responseJson.poi.addr_housenumber !== undefined) {
    //     userLocation = responseJson.poi.addr_housenumber+ " " + responseJson.poi.addr_street + ", " + responseJson.osmtags.name+ ", " + responseJson.region;
    //     }
    //     else if(responseJson.poi.addr_housenumber === undefined && responseJson.poi.addr_street !== undefined) {
    //       userLocation = responseJson.poi.addr_street + ", " + responseJson.osmtags.name+ ", " + responseJson.region;
    //     }
    //     else if(responseJson.poi.addr_street === undefined){
    //       userLocation =  responseJson.osmtags.name+ ", " + responseJson.region;
    //     }
    //     this.setState({
    //       userLocation: userLocation,
    //       regionChangeProgress: false
    //     });

    // });
  }

  // Update state on region change

  // Action to be taken after select location button click
  const onLocationSelect = () => console.log(currentPlace.description)

  if (loading) {
    return (
      <View style={styles.spinnerView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 2 }}>
          {!!region.latitude && !!region.longitude && (
            <MapView
              style={{
                ...styles.map,
                marginTop: marginTop
              }}
              ref={mapRef}
              // region={{
              //   latitude: currentPlace?.latitude || region.latitude,
              //   longitude: currentPlace?.longitude || region.longitude,
              //   latitudeDelta: 0.01,
              //   longitudeDelta: 0.01
              // }}
              region={{
                latitude: currentPlace?.latitude || 21.0369,
                longitude: currentPlace?.longitude || 105.7823,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
              showsUserLocation={true}
              onMapReady={onMapReady}
              //onRegionChangeComplete={onRegionChange}
              onPress={onPressMap}
              onPoiClick={onPressMap}
            >
              <MapView.Marker
                coordinate={{
                  latitude: currentPlace?.latitude || 21.0369,
                  longitude: currentPlace?.longitude || 105.7823
                }}
                title={'Vị trí của bạn'}
                draggable
                // onPress={() => {
                //   console.log(region)
                // }}
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
              Chọn vị trí trên bản đồ
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
            VỊ TRÍ
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
              : 'Đang lấy vị trí...'}
          </Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={onLocationSelect}
          >
            <Text style={styles.ButtonText}>Lấy vị trí tại đây</Text>
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
