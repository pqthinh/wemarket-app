import React from 'react'
import { Image } from 'react-native'

const ImageComponent = ({ source, ...rest }) => {
  const [img, setImg] = React.useState(source)
  return (
    <Image
      source={img}
      {...rest}
      onError={() => {
        setImg({
          uri: 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
        })
      }}
    />
  )
}

export default ImageComponent
