import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { usePlace } from '../context/PlacesManager'
import Geocoder from 'react-native-geocoding'
import { GOOGLE_MAPS_API_KEY } from '../utils/map/constants'

Geocoder.init(GOOGLE_MAPS_API_KEY, { language: 'vi' })
const Text = styled.Text`
  padding: 5px;
  font-size: 14px;
  color: black;
`

export default function Prediction({ description, place_id, toggleModal }) {
  const { dispatchPlace } = usePlace()
  return (
    <TouchableOpacity
      key={place_id}
      testID={`prediction-row-${place_id}`}
      onPress={() => {
        Geocoder.from(description).then(res => {
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
        toggleModal()
      }}
    >
      <Text>{description}</Text>
    </TouchableOpacity>
  )
}
