import React from 'react'
import { Controller } from 'react-hook-form'

import {
  WrapperLabel,
  Wrapper,
  DangerText,
  TextLabel,
  TextInput
} from './styled'

const Input = ({
  label,
  errorText,
  required,
  name,
  type = 'text',
  secureTextEntry,
  component,
  control,
  ...others
}) => {
  return (
    <Wrapper>
      <WrapperLabel>
        <TextLabel>{label}</TextLabel>
        {required ? <DangerText>*</DangerText> : null}
      </WrapperLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={secureTextEntry || type == 'password'}
            type={type}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            {...others}
          />
        )}
      />
      {errorText ? <DangerText>{errorText}</DangerText> : null}
    </Wrapper>
  )
}
export default Input
