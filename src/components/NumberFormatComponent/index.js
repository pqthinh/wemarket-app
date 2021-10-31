import React from 'react'
import { Text } from '@ui-kitten/components'
import NumberFormat from 'react-number-format'

const NumberFormatComponent = ({
  value,
  displayType = 'text',
  suffix = ' đ',
  thousandSeparator = true,
  ...others
}) => {
  return (
    <NumberFormat
      value={value}
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      suffix={suffix}
      {...others}
      renderText={formattedValue => <Text>{formattedValue}</Text>}
    />
  )
}
export default NumberFormatComponent
