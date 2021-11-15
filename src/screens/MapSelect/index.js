import React from 'react'
import UserScreen from './UserScreen'
import { PlaceProvider } from '../../context/PlacesManager'

const MapSelect = () => {
  return (
    <PlaceProvider>
      <UserScreen />
    </PlaceProvider>
  )
}

export default MapSelect
