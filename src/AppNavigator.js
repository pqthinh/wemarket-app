import React, { useState, useEffect } from 'react'
import AuthScreens from 'screens/AuthScreens'
import UnAuthScreens from 'screens/UnAuthScreens'
import { firebase } from './configs/firebaseConfig'

export const AppNavigator = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [])

  if (!isLogin) return <UnAuthScreens />
  return <AuthScreens />
}
