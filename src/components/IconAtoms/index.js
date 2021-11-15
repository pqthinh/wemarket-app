import React from 'react'
import { IconBase } from './styled'

const IconAtoms = ({ name, size, color, ...rest }) => {
  return <IconBase name={name} size={size} color={color} {...rest} />
}

export default React.memo(IconAtoms)
