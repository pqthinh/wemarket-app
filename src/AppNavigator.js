import React, { useState, useEffect } from 'react'
import AuthScreens from './screens/AuthScreens'
import UnAuthScreens from './screens/UnAuthScreens'
import { ThemeContext } from './stores/theme-context'
import { firebase } from './configs/firebaseConfig'

export const AppNavigator = () => {
  const themeContext = React.useContext(ThemeContext)
  const [isLogin, setIsLogin] = useState(false)

  const { onShowRealApp } = themeContext

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true)
        onShowRealApp(true)
      } else {
        setIsLogin(false)
        onShowRealApp(true)
      }
    })
  }, [])

  if (!isLogin) return <UnAuthScreens />
  return <AuthScreens />
}
