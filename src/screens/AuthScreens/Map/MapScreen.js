import React, { useEffect, useState, useMemo } from "react"
import { Alert, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity} from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"
import Ionicons from 'react-native-vector-icons/Ionicons'
import products from "./data"
import ic_phone from '../../../assets/images/ic_phone.png'
import MapModal from "../../../components/MapModal"
import SettingModal from "../../../components/SettingModal"
// import { customStyleMap} from "./styled"
const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  // const [zoom, setZoom] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [product, setProduct] =useState({place:'', name:'', image:'',name_user:'', star:'',price:''})
  const [radius,setRadius]= useState(1);
  const [region, setRegion] = useState({
    latitude: location?.latitude || 21.0369,
    longitude: location?.longitude || 105.7823,
    latitudeDelta: Math.PI*radius/ 111.045,
    longitudeDelta: 0.01
  });
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
  const close_2 = ()=> {
    setModalVisible2(false)
  }
  useEffect(() => {
    handleLocationPermission()
  }, [])
  useMemo(() => {
    setRegion(prevState=>({...prevState, latitudeDelta:Math.PI*radius/ 111.045}))
  }, [radius])
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
          region={region}
          // onRegionChange={region => setRegion(region)}
       
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
          {products.map((host, i) => {
            if (host.place.latitude && host.place.longitude) {
              
             return(<Marker
                key={i}
                coordinate={{
                  latitude: host.place.latitude,
                  longitude: host.place.longitude
                }}
                image={ic_phone}
                title={host.name_product}
                pinColor={"#ffd1dc"}
                onPress={()=> {
                  setModalVisible(true);
                  setProduct({place: host.place.name, name:host.name_product,image:host.product_images[0],name_user:host.name_user,star:host.star, price:host.price})
                  setModalVisible2(false)
                }}
              />)
            }
          })}
          <MapView.Circle
        center={{
          latitude: location?.latitude || 21.0541883,
          longitude: location?.longitude || 105.8263367,
        }}
        radius={radius*1000}
        strokeWidth={2}
        strokeColor="#3399ff"
        fillColor="rgba(128,191,255,0.2)"
      />
          </MapView>
          <TouchableOpacity style={styles.Button} onPress={()=>{setModalVisible2(true); setModalVisible(false)}}>
          <Ionicons name="options" size={24} color="black" />
          </TouchableOpacity>
          <MapModal modalVisible={modalVisible} close={close} product={product}/>
          <SettingModal modalVisible={modalVisible2} close={close_2} sliderValue={radius} setSliderValue={setRadius}/>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  }
})

export default MapScreen