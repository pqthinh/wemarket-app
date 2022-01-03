import { Button, Input, Text } from '@ui-kitten/components'
import { signup, toggleBottom } from 'actions/userActions'
import { IMAGES } from 'assets'
import { Loading } from 'components'
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
import { HOME_SCREEN, SIGN_IN_SCREEN } from 'utils/ScreenName'
import { Container } from './styled'

export default function SignUp({ navigation }) {
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
    dispatch(signup({ data, handleCheck }))
  }

  React.useEffect(() => {
    dispatch(toggleBottom(true))
    return () => dispatch(toggleBottom(false))
  }, [dispatch])

  React.useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userInfo?.message + '👋'
      })
    } else Toast.hide()
    if (withBoolean('userInfo.userInfo.uid', userInfo))
      navigation.reset({
        index: 0,
        routes: [{ name: HOME_SCREEN }]
      })
  }, [error, userInfo])

  return (
    <Container>
      <Toast
        position='top'
        topOffset={50}
        style={{ marginEnd: 50, marginLeft: 10, marginTop: -50 }}
        ref={ref => Toast.setRef(ref)}
      />
      <Loading loading={userInfo.loading} />
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
                    label={() => <Text style={styles.label}>Họ và tên</Text>}
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
                    label={() => (
                      <Text style={styles.label}>Số điện thoại</Text>
                    )}
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
                    label={() => <Text style={styles.label}>Địa chỉ</Text>}
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
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
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
                    label={() => (
                      <Text style={styles.label}>Nhập lại mật khẩu</Text>
                    )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
    top: '150%',
    color: '#EB5757',
    fontWeight: '500'
  },
  back: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center'
  },
  backText: {
    color: '#2F80ED',
    fontWeight: '900'
  },
  input: {
    position: 'relative',
    height: 40,
    marginVertical: 20,
    paddingHorizontal: 5
  },
  button: {
    marginVertical: 30,
    paddingHorizontal: 5
  },
  label: { fontSize: 14, fontWeight: '700' }
})
