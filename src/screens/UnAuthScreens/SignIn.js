import { useTheme } from '@react-navigation/native'
import { firebase } from 'configs/firebaseConfig'
import React, { useState, useCallback } from 'react'
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
import { SIGN_UP_SCREEN } from 'utils/ScreenName'
import { validateEmail } from 'utils/helper'
import { useLoading } from 'stores/loading-context'

export default function SignIn({ navigation }) {
  const { show, hide } = useLoading()
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const handleChange = useCallback(
    (name, value) => {
      setError(null)
      setData(data => ({ ...data, [name]: value }))
    },
    [data]
  )

  const signIn = () => {
    const { email, password } = data
    if (!validateEmail(email)) {
      setError('Email không đúng định dạng')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu ít nhất 6 ký tự')
      return
    }
    async function execute() {
      show()
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        // if (res) console.log(res, 'result')
      } catch (error) {
        switch (error?.code) {
          case 'auth/user-not-found':
            setError('Tài khoản không tồn tại')
            break
          case 'auth/wrong-password':
            setError('Mật khẩu ko chính xác ')
            break
          case 'auth/too-many-requests':
            setError('Tài khoản tạm thời bị khoá do đăng nhập quá nhiều ')
            break
          default:
            setError(error.toString() || 'Lỗi mạng ')
            break
        }
      }
      hide()
    }
    execute()
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View>
          <Image style={styles.image} source={IMAGES.LOGO} />
        </View>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.info}>
          <View style={styles.input}>
            <Input
              title='Email'
              placeholder='test1@gmail'
              value={data.email}
              onChangeText={v => handleChange('email', v)}
            />
          </View>
          <View style={styles.input}>
            <Input
              title='Mật khẩu'
              placeholder='6 ký tự trở lên'
              secureTextEntry={true}
              value={data.password}
              onChangeText={v => handleChange('password', v)}
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
            <Button onPress={signIn}>Đăng nhập</Button>
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
      alignSelf: 'center',
      color: colors.red[1],
      fontWeight: '700'
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
