import { useTheme } from '@react-navigation/native'
import React from 'react'
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

export default function SignIn({ navigation }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return state.userState
  })
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
  const signIn = data => {
    const { email, password } = data
    dispatch(login({ email, password }))
  }

  React.useEffect(() => {
    if (userInfo.message) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: userInfo?.message + '👋'
      })
    }
  }, [userInfo])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Toast ref={ref => Toast.setRef(ref)} />
      <ScrollView style={styles.scroll}>
        <View>
          <Image style={styles.image} source={IMAGES.LOGO} />
        </View>
        <View style={styles.infor}>
          <View style={styles.input}>
            {errors.email?.type === 'required' && (
              <Text style={styles.error}>Chưa nhập email.</Text>
            )}
            {errors.email?.type === 'pattern' && (
              <Text style={styles.error}>Email chưa chính xác.</Text>
            )}
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
          </View>
          <View style={styles.input}>
            {errors.password?.type === 'required' && (
              <Text style={styles.error}>Chưa nhập mật khẩu.</Text>
            )}
            {errors.password?.type === 'pattern' && (
              <Text style={styles.error}>
                Phải chứa ít nhất 6 ký tự bao gồm ít nhất 1 số, 1 chữ hoa, 1 chữ
                thường.
              </Text>
            )}
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
          </View>

          <Text style={styles.signUp}>
            Bạn đã có tài khoản chưa ?
            <TouchableOpacity
              onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
            >
              <Text style={styles.signUpText}> Đăng ký</Text>
            </TouchableOpacity>
          </Text>

          <View style={styles.button}>
            <Button onPress={handleSubmit(signIn)}>Đăng nhập</Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const makeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 35,
      paddingHorizontal: 10
    },
    scroll: {
      width: '90%',
      height: '100%'
    },
    image: {
      alignSelf: 'center',
      height: 197,
      width: 236
    },
    button: {
      height: 100
    },
    info: {
      flex: 1,
      marginTop: 10
    },
    error: {
      paddingTop: 30,
      alignSelf: 'flex-start',
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
      height: 100
    }
  })
