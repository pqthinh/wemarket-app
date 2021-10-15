import React from 'react'
import { View } from 'react-native'
import { Controller } from 'react-hook-form'
import { Text, Input } from '@ui-kitten/components'
import PropTypes from 'prop-types'

export const InputComponent = ({
  title = 'Title',
  type = 'text',
  placeholder,
  defaultValue,
  onBlur,
  onChangeText,
  value,
  name,
  errors,
  rules
}) => {
  return (
    <View style={styles.input}>
      {errors.email?.type === 'required' && (
        <Text style={styles.error}>Chưa nhập email.</Text>
      )}
      {errors.email?.type === 'pattern' && (
        <Text style={styles.error}>Email chưa chính xác.</Text>
      )}
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            title={title}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            name={name}
          />
        )}
        name='email'
        defaultValue={defaultValue}
      />
    </View>
  )
}

InputComponent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  rules: PropTypes.object,
  name: PropTypes.string,
  errors: PropTypes.array,
  defaultValue: PropTypes.any
}
