import { Button, Input, Text } from '@ui-kitten/components'
import { login, toggleBottom } from 'actions/userActions'
import { IMAGES } from 'assets'
import { withBoolean } from 'exp-value'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_SCREEN, SIGN_UP_SCREEN } from 'utils/ScreenName'
import { Container } from './styled'

export default function SignIn({ navigation }) {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return state.userState
  })
  const [error, setError] = useState()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleCheck = (type, error, message) => {
    setError(!error)
  }

  const signIn = data => {
    const { email, password } = data
    dispatch(login({ email, password, handleCheck }))
  }

  React.useEffect(() => {
    dispatch(toggleBottom(true))
    return () => dispatch(toggleBottom(false))
  }, [dispatch])

  React.useEffect(() => {
    if (error && userInfo?.message) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userInfo.message + '👋'
      })
    } else Toast.hide()
  }, [error, userInfo])

  React.useEffect(() => {
    if (withBoolean('userInfo.uid', userInfo)) {
      navigation.reset({
        index: 0,
        routes: [{ name: HOME_SCREEN }]
      })
    }
  }, [userInfo.userInfo])

  return (
    <Container>
      <Toast
        position='top'
        topOffset={50}
        style={{ marginEnd: 50, marginLeft: 10, marginTop: -50 }}
        ref={ref => Toast.setRef(ref)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          style={styles.scroll}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logo}>
            <Image style={styles.image} source={IMAGES.LOGO} />
          </View>
          <View style={styles.content}>
            <View style={styles.input}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={() => <Text style={styles.label}>Email</Text>}
                    type='email'
                    placeholder='test1@gmail'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='email'
                defaultValue=''
              />
              {errors.email?.type === 'required' && (
                <Text style={styles.error}>Chưa nhập email.</Text>
              )}
              {errors.email?.type === 'pattern' && (
                <Text style={styles.error}>Email chưa chính xác.</Text>
              )}
            </View>

            <View style={styles.input}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={() => <Text style={styles.label}>Mật khẩu</Text>}
                    type='text'
                    secureTextEntry={true}
                    placeholder='Mật khẩu'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='password'
                defaultValue=''
              />
              {errors.password?.type === 'required' && (
                <Text style={styles.error}>Chưa nhập mật khẩu.</Text>
              )}
            </View>

            <Text style={styles.signUp}>
              Bạn đã có tài khoản chưa ?
              <TouchableOpacity
                onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
              >
                <Text style={styles.signUpText}> Đăng ký</Text>
              </TouchableOpacity>
            </Text>

            <View style={{ paddingHorizontal: 5 }}>
              <Button onPress={() => handleSubmit(signIn)}>Đăng nhập</Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: {
    width: '90%',
    height: '100%'
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 150
  },
  logo: {
    marginVertical: 20
  },
  content: {
    flex: 1,
    marginTop: 10
  },
  error: {
    position: 'absolute',
    top: '150%',
    color: '#EB5757',
    fontWeight: '500'
  },
  signUp: {
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    color: '#E26740',
    fontWeight: '900',
    padding: 0,
    margin: 0
  },
  input: {
    position: 'relative',
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 5
  },
  label: { fontSize: 14, fontWeight: '700' }
})
