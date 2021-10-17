import React from 'react';
import MapView, { Geojson } from 'react-native-maps';
import { StyleSheet } from 'react-native';
const myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [ 21.044115, 105.7888733],
      },
    }
  ],
};

export const MapScreen = props => (
  <MapView style={{...StyleSheet.absoluteFillObject}}>
    <Geojson geojson={myPlace} />
  </MapView>
);
