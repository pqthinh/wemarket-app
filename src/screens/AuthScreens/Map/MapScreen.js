import React, { useEffect, useState } from "react"
import { Alert, SafeAreaView, StatusBar, StyleSheet} from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"
import locations from "./data"
import ic_phone from '../../../assets/images/ic_phone.png'
import MapModal from "../../../components/MapModal"
// import { customStyleMap} from "./styled"
const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] =useState({place:''})
  const handleLocationPermission = async () => { // 👈
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
  };
  const close = ()=> {
    setModalVisible(false)
  }
  useEffect(() => {
    handleLocationPermission()
  }, [])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position)
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      error => {

        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* {location && ( */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location?.latitude || 21.0541883 ,
            longitude: location?.longitude || 105.8263367,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
        showsIndoors={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsScale={true}
        showsBuildings={true}
        showsCompass={true}
          showsUserLocation={true}
          // customMapStyle={customStyleMap} 
          paddingAdjustmentBehavior="automatic" 
          showsMyLocationButton={true} 
          showsBuildings={true} 
          maxZoomLevel={17.5} 
          loadingEnabled={true} 
          loadingIndicatorColor="#fcb103" 
          loadingBackgroundColor="#242f3e" 
        >
          {locations.map((host, i) => {
            if (host.latitude && host.longitude) {
              console.log("TEST", host.latitude);
             return(<Marker
                key={i}
                coordinate={{
                  latitude: host.latitude,
                  longitude: host.longitude
                }}
                image={ic_phone}
                title={host.name}
                pinColor={"#ffd1dc"}
                onPress={()=> {
                  setModalVisible(true);
                  setProduct({place: host.name})
                }}
              />)
            }
          })}
          <MapView.Circle
        center={{
          latitude: location?.latitude || 21.0541883,
          longitude: location?.longitude || 105.8263367,
        }}
        radius={10000}
        strokeWidth={2}
        strokeColor="#3399ff"
        fillColor="rgba(128,191,255,0.2)"
      />
          </MapView>
          <MapModal modalVisible={modalVisible} close={close} product={product}/>
      {/* )} */}
    </SafeAreaView>
  )
}
 

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default MapScreen