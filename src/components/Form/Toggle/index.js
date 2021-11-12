import React from 'react'
import { WrapperToggle, Label } from './styled'

const Toggle = ({
  label,
  activeChecked,
  onActiveCheckedChange,
  status = 'primary',
  ...other
}) => {
  return (
    <WrapperToggle
      style={styles.toggle}
      checked={activeChecked}
      onChange={onActiveCheckedChange}
      status={status}
      {...other}
    >
      <Label>{label}</Label>
    </WrapperToggle>
  )
}
export default Toggle
