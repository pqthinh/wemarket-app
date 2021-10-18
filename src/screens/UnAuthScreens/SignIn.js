import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Input, Button, Text } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGES } from 'assets'
import { SIGN_UP_SCREEN } from 'utils/ScreenName'
import { login } from 'actions/userActions'
import { useForm, Controller } from 'react-hook-form'
import Toast from 'react-native-toast-message'
import { Container } from './styled'

export default function SignIn({ navigation }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
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
    console.log(type, error, message)
  }

  const signIn = data => {
    const { email, password } = data
    dispatch(login({ email, password, handleCheck }))
  }

  React.useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userInfo?.message + '👋'
      })
    } else Toast.hide()
  }, [error, userInfo])

  return (
    <Container>
      <Toast ref={ref => Toast.setRef(ref)} />
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
                    title='Email'
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
                    title='Mật khẩu'
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

            <View>
              <Button onPress={handleSubmit(signIn)}>Đăng nhập</Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}

const makeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60
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
      marginVertical: 40
    },
    content: {
      flex: 1,
      marginTop: 10
    },
    error: {
      position: 'absolute',
      top: '100%',
      color: colors.red[1],
      fontWeight: '500'
    },
    signUp: {
      marginVertical: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    signUpText: {
      color: colors.primary,
      fontWeight: '900',
      padding: 0,
      margin: 0
    },
    input: {
      position: 'relative',
      height: 40,
      marginVertical: 20
    }
  })
