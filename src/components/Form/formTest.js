import React from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Icon, Layout, Text } from '@ui-kitten/components'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { withEmpty } from 'exp-value'
import Toggle from './Toggle'

const schema = yup.object().shape({
  firstName: yup.string().required('First Name should be required please'),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null])
})

function Form() {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: 'thinh',
      lastName: 'phamq',
      email: '',
      age: 21,
      password: '',
      confirmPassword: ''
    }
  })

  const submitForm = data => {
    console.log(data)
  }

  const renderInputIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  )

  return (
    <ScrollView style={{ width: '100%' }}>
      <Text style={{ textAlign: 'center' }}>Sign Up</Text>
      <Input
        {...register('firstName')}
        type='text'
        name='firstName'
        control={control}
        placeholder='First Name...'
        label='First Name...'
        errorText={withEmpty('firstName.message', errors)}
      />
      <Input
        {...register('lastName')}
        type='text'
        name='lastName'
        placeholder='Last Name...'
        control={control}
        label='Last Name ...'
        errorText={withEmpty('lastName.message', errors)}
      />
      <Input
        {...register('email')}
        type='email'
        name='email'
        placeholder='Email...'
        control={control}
        label='Email ...'
        errorText={withEmpty('email.message', errors)}
      />
      <Input
        {...register('age')}
        type='number'
        name='age'
        placeholder='Age...'
        control={control}
        label='Age ...'
        errorText={withEmpty('age.message', errors)}
      />

      <Input
        {...register('password')}
        type='text'
        name='password'
        placeholder='Password...'
        control={control}
        label='Password ...'
        errorText={withEmpty('password.message', errors)}
        accessoryLeft={renderInputIcon}
        secureTextEntry={secureTextEntry}
      />

      <Input
        {...register('confirmPassword')}
        type='text'
        name='confirmPassword'
        placeholder='Confirm Password...'
        control={control}
        label=' Confirm Password ...'
        errorText={withEmpty('confirmPassword.message', errors)}
        accessoryLeft={renderInputIcon}
        secureTextEntry={secureTextEntry}
      />
      <Toggle label='toggle' />

      <Button onPress={handleSubmit(submitForm)} label='Submit' />
    </ScrollView>
  )
}

export default Form
