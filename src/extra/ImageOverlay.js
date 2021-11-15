import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

const DEFAULT_OVERLAY_COLOR = '#F2F3F7'

export const ImageOverlay = ({ style, children, ...imageBackgroundProps }) => {
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style)

  return (
    <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }
        ]}
      />
      {children}
    </ImageBackground>
  )
}

ImageOverlay.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any
}
