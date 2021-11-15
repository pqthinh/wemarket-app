import React from 'react'
import { WrapperButton, Title } from './styled'

const Button = ({ label, ...props }) => {
  return (
    <WrapperButton activeOpacity={0.8} {...props}>
      <Title>{label}</Title>
    </WrapperButton>
  )
}
export default Button
