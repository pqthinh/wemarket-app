import React, { useState, useEffect } from 'react'
import AuthScreens from 'screens/AuthScreens'
import UnAuthScreens from 'screens/UnAuthScreens'
import { firebase } from 'configs/firebaseConfig'
import Loading from 'components/Loading'

export const AppNavigator = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true)
        setLoad(true)
      } else {
        setIsLogin(false)
        setLoad(true)
      }
    })
  })
  if (isLogin) return <AuthScreens />
  return (
    <>
      <Loading loading={!load} />
      <UnAuthScreens />
    </>
  )
}
