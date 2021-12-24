import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const IonIconsPack = {
  name: 'ionicons',
  icons: createIconsMap()
}

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name)
      }
    }
  )
}

const IconProvider = name => ({
  toReactElement: props => Ionicons({ name, ...props })
})

function Ionicons({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style)
  return (
    <Icon
      name={name}
      size={height || 24}
      color={tintColor || '#f0f0f0'}
      style={iconStyle}
    />
  )
}
