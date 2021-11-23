import { useTheme } from '@react-navigation/native'
import React, { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { IMAGES } from 'assets'
import { signup } from 'actions/userActions'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { Container } from './styled'

export default function SignUp({ navigation }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return state.userState
  })
  const [error, setError] = useState()

  const handleCheck = (type, error, message) => {
    setError(!error)
  }

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
      name: '',
      phone: '',
      address: ''
    }
  })
  const signUp = data => {
    dispatch(signup(data, handleCheck))
  }

  React.useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userInfo?.message + '👋'
      })
    }
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
                  maxLength: 100,
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title='Họ và tên'
                    type='text'
                    placeholder='Họ và tên'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='name'
                defaultValue=''
              />
              {errors.name?.type === 'required' && (
                <Text style={styles.error}>Chưa nhập họ và tên.</Text>
              )}
              {errors.name?.type === 'maxLength' && (
                <Text style={styles.error}>
                  Độ dài tên không được quá 100 ký tự.
                </Text>
              )}
            </View>

            <View style={styles.input}>
              <Controller
                control={control}
                rules={{
                  maxLength: 12,
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title='Số điện thoại'
                    type='tel'
                    placeholder='Số điện thoại'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='phone'
                defaultValue=''
              />
              {errors.phone?.type === 'required' && (
                <Text style={styles.error}>Chưa nhập số điện thoại.</Text>
              )}
              {errors.phone?.type == 'maxLength' && (
                <Text style={styles.error}>Số điện thoại không hợp lệ.</Text>
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
                    title='Địa chỉ'
                    type='text'
                    placeholder='Địa chỉ'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='address'
                defaultValue=''
              />
              {errors.address?.type == 'required' && (
                <Text style={styles.error}>Chưa nhập địa chỉ.</Text>
              )}
            </View>

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
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
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
              {errors.password?.type === 'pattern' && (
                <Text style={styles.error}>
                  Phải chứa ít nhất 6 ký tự bao gồm ít nhất 1 số, 1 chữ hoa, 1
                  chữ thường.
                </Text>
              )}
            </View>

            <View style={styles.input}>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    title='Nhập lại mật khẩu'
                    type='text'
                    secureTextEntry={true}
                    placeholder='Mật khẩu'
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
                name='rePassword'
                defaultValue=''
              />
              {getValues('rePassword') !== getValues('password') && (
                <Text style={styles.error}>
                  Mật khẩu nhập lại chưa chính xác.
                </Text>
              )}
            </View>

            <View style={styles.button}>
              <Button onPress={handleSubmit(signUp)}>Đăng ký</Button>
            </View>
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate(SIGN_IN_SCREEN)}
            >
              <Text style={styles.backText}> Trở lại màn đăng nhập </Text>
            </TouchableOpacity>
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
      height: '90%'
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
      top: '100%',
      color: colors.red,
      fontWeight: '500'
    },
    back: {
      marginTop: 10,
      marginBottom: 30,
      alignItems: 'center'
    },
    backText: {
      color: colors.primary,
      fontWeight: '900'
    },
    input: {
      position: 'relative',
      height: 40,
      marginVertical: 20
    },
    button: {
      marginVertical: 30
    }
  })
