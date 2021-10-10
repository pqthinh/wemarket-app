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
import { validateEmail } from 'utils/helper'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'
import { withEmpty } from 'exp-value'

export default function SignUp({ navigation }) {
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    email: '',
    password: '',
    rePassword: '',
    name: ''
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

  const signUp = () => {
    const { email, password, name, rePassword } = data

    if (!validateEmail(email)) {
      setError('Email không đúng định dạng')
      return
    }
    if (rePassword !== password) {
      setError('Mật khẩu nhập lại không đúng')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu ít nhất 6 ký tự')
      return
    }
    console.log(email, password, name, rePassword)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        //save new user into user collection
        console.log(result, 'result sign up')
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
            name
          })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!')
          return
        }

        if (error.code === 'auth/invalid-email') {
          setError.log('That email address is invalid!')
          return
        }
        setError(withEmpty('message', error))
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
        <Text style={styles.error}>{error}</Text>

        <View style={styles.infor}>
          <Input
            title='Email'
            placeholder='test1@gmail'
            value={data.email}
            onChangeText={v => handleChange('email', v)}
          />
          <Input
            title='Tên'
            placeholder='Tên'
            value={data.name}
            onChangeText={v => handleChange('name', v)}
          />
          <Input
            title='Mật khẩu'
            placeholder='6 ký tự trở lên'
            secureTextEntry={true}
            value={data.password}
            onChangeText={v => handleChange('password', v)}
          />
          <Input
            title='Nhập lại mật khẩu '
            placeholder='6 ký tự trở lên'
            secureTextEntry={true}
            value={data.rePassword}
            onChangeText={v => handleChange('rePassword', v)}
          />
        </View>
        <Button title='Đăng ký' onPress={signUp} />

        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate(SIGN_IN_SCREEN)}
        >
          <Text style={styles.backText}> Trở lại màn đăng nhập </Text>
        </TouchableOpacity>
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
      paddingVertical: 30,
      paddingHorizontal: 10
    },
    image: {
      alignSelf: 'center',
      height: 197,
      width: 236
    },
    infor: {
      marginTop: 10,
      marginBottom: 20
    },
    error: {
      paddingTop: 20,
      alignSelf: 'center',
      color: colors.red[1],
      fontWeight: '700'
    },
    back: {
      marginTop: 5,
      alignItems: 'center'
    },
    backText: {
      color: colors.primary,
      fontWeight: '900'
    }
  })
