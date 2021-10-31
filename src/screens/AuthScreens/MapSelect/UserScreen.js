import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import MapView from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "../../../utils/map/constants";
import styles from "./styles";

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          region: {
            latitude: 21.0369,
            longitude: 105.7823,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          },
          isMapReady: false,
          marginTop: 1,
          userLocation: "",
          regionChangeProgress: false
        };
      }
    
      componentWillMount() {
        Geolocation.getCurrentPosition(
          (position) => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            };
            this.setState({
              region: region,
              loading: false,
              error: null,
            });
          },
          (error) => {
            alert(error);
            this.setState({
              error: error.message,
              loading: false
            })
          },
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
      }
    
      onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
      }
    
      // Fetch location details as a JOSN from google map API
      fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + `${GOOGLE_MAPS_API_KEY}`)
          .then((response) => response.json())
          .then((responseJson) => {
            const userLocation = responseJson.results[0].formatted_address;
            this.setState({
              userLocation: userLocation,
              regionChangeProgress: false
            });
          });
        // fetch(`https://geocode.xyz/${this.state.region.latitude},${this.state.region.longitude}?geoit=json`
        // )
        //   .then((response) => response.json())
        //   .then((responseJson) => {
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
          
        //   });
      }
    
      // Update state on region change
      onRegionChange = region => {
        this.setState({
          region,
          regionChangeProgress: true
        }, () => this.fetchAddress());
      }
    
      // Action to be taken after select location button click
      onLocationSelect = () => alert(this.state.userLocation);
    
      render() {
        if (this.state.loading) {
          return (
            <View style={styles.spinnerView}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <View style={{ flex: 2 }}>
                {!!this.state.region.latitude && !!this.state.region.longitude &&
                  <MapView
                    style={{ ...styles.map, marginTop: this.state.marginTop }}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    onMapReady={this.onMapReady}
                    onRegionChangeComplete={this.onRegionChange}
                  >
                    <MapView.Marker
                      coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                      title={"Your Location"}
                      draggable
                      onPress={()=>{console.log(this.state.region)}}
                    />
                  </MapView>
                }
    
                
              </View>
              <View style={styles.deatilSection}>
                <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>Move map for location</Text>
                <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
                <View style={styles.btnContainer}>
                  <Button
                    title="PICK THIS LOCATION"
                    disabled={this.state.regionChangeProgress}
                    onPress={this.onLocationSelect}
                  >
                  </Button>
                </View>
              </View>
            </View>
          );
        }
      }
}