import { useTheme } from '@react-navigation/native'
import { firebase } from '../../configs/firebaseConfig'
import React, { useState, useCallback } from 'react'
import { useForm, Controller } from "react-hook-form";
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
import { IMAGES } from '../../assets'
import { validateEmail } from '../../utils/helper'
import { SIGN_IN_SCREEN } from '../../utils/ScreenName'

export default function SignUp({ navigation }) {
  
  // const [data, setData] = useState({
  //   email: '',
  //   password: '',
  //   rePassword: '',
  //   name: '',
  //   phone: '',
  //   address: '',
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
  const { control, getValues, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
    email: '',
    password: '',
    rePassword: '',
    name: '',
    phone: '',
    address: '',
    }
  });
  const signUp = (data) => {
    const { email, password, name} = data

    // if (!validateEmail(email)) {
    //   setError('email ko chính xác')
    //   return
    // }
    // if (rePassword !== password) {
    //   setError('Mật khẩu nhập lại ko chính xác')
    //   return
    // }
    // if (password.length < 6) {
    //   setError('Mật khẩu không < 6 ký tự')
    //   return
    // }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        //save new user into user collection
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
        Alert.alert('Tài khoản đã tồn tại')
      });
     
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
        {/* <Text style={styles.error}>{error}</Text> */}

        <View style={styles.infor}>
          {/* <Input
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
          /> */}
    {errors.name?.type ==="required" && <Text style={styles.error}>Chưa nhập họ và tên.</Text>}
    {errors.name?.type ==='maxLength' && <Text style={styles.error}>Độ dài tên không được quá 100 ký tự.</Text>}   
    <Controller
        control={control}
        rules={{
         maxLength: 100,
         required: true,
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
        name="name"
        defaultValue=""
      />
      {errors.phone?.type ==="required" && <Text style={styles.error}>Chưa nhập số điện thoại.</Text>}
      {errors.phone?.type =='maxLength' && <Text style={styles.error}>Số điện thoại không hợp lệ.</Text>}
      <Controller
        control={control}
        rules={{
        maxLength: 12,
         required: true,
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
        name="phone"
        defaultValue=""
      />
      {errors.address?.type =="required" && <Text style={styles.error}>Chưa nhập địa chỉ.</Text>}
      <Controller
        control={control}
        rules={{
         required: true,
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
        name="address"
        defaultValue=""
      />
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
      {getValues('rePassword')!==getValues('password') && <Text style={styles.error}>Mật khẩu nhập lại chưa chính xác.</Text>}
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
        name="rePassword"
        defaultValue=""
      />
     
        </View>
        <Button title='Đăng ký' onPress={handleSubmit(signUp)} />

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
      alignSelf: 'flex-start',
      color: colors.red[1],
      fontWeight: '500'
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
