import React from 'react'
import MapScreen from './MapScreen'
import { PlaceProvider } from '../../context/PlacesManager'

export default function Map() {
  return (
    <PlaceProvider>
      <MapScreen />
    </PlaceProvider>
  )
}
