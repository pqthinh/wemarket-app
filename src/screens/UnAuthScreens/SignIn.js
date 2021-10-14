import { useTheme } from '@react-navigation/native'
import { firebase } from '../../configs/firebaseConfig'
import React, { useState, useCallback } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Input, Button, Text } from '@ui-kitten/components'
import { useForm, Controller } from "react-hook-form";
import { IMAGES } from '../../assets'
import { SIGN_UP_SCREEN } from '../../utils/ScreenName'
import { validateEmail } from '../../utils/helper'

export default function SignIn({ navigation }) {
  // const [error, setError] = useState(null)
  // const [data, setData] = useState({
  //   email: '',
  //   password: ''
  // })
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  // const handleChange = useCallback(
  //   (name, value) => {
  //     setError(null)
  //     setData(data => ({ ...data, [name]: value }))
  //   },
  //   [data]
  // )
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
    email: '',
    password: ''
    }
  });
  const signIn = (data) => {
    const { email, password } = data
    // if (!validateEmail(email)) {
    //   setError('email ko chính xác')
    // }
    // if (password.length < 6) {
    //   setError('Mật khẩu không < 6 ký tự')
    // }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Tài khoản không tồn tại!')
            break
          case 'auth/wrong-password':
            Alert.alert('Mật khẩu không chính xác!')
            break
          case 'auth/too-many-requests':
            Alert.alert('Tài khoản tạm thời bị khoá do đăng nhập quá nhiều!')
            break
          default:
            Alert.alert(error.toString() || 'Lỗi mạng!')
            break
        }
        console.log(error)
      })
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
        <View style={styles.infor}>
          <View style={styles.input}>
          {errors.email?.type ==="required" && <Text style={styles.error}>Chưa nhập email.</Text>}
      {errors.email?.type ==="pattern" && <Text style={styles.error}>Email chưa chính xác.</Text>}
    <Controller
        control={control}
        rules={{
         required: true,
         pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
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
        name="email"
        defaultValue=""
      />
          </View>
          <View style={styles.input}>
          {errors.password?.type ==="required" && <Text style={styles.error}>Chưa nhập mật khẩu.</Text>}
      {errors.password?.type ==='pattern' && <Text style={styles.error}>Phải chứa ít nhất 6 ký tự bao gồm ít nhất 1 số, 1 chữ hoa, 1 chữ thường.</Text>}
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
        name="password"
        defaultValue=""
      />
          </View>

          <Text style={styles.signUp}>
            Bạn đã có tài khoản chưa ?
            <TouchableOpacity
              onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpText}> Đăng ký</Text>
            </TouchableOpacity>
          </Text>

          <View style={styles.button}>
            <Button title='Đăng nhập ' onPress={handleSubmit(signIn)} />
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
    infor: {
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
      marginTop: 20,
      marginBottom: 20
    },
    signUpButton: {
      paddingTop: 3
    },
    signUpText: {
      color: colors.primary,
      fontWeight: '900'
    },
    input: {
      height: 100,
      marginVertical: 5
    }
  })
