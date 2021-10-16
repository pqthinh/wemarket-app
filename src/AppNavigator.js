import React, { useState, useEffect } from 'react'
import AuthScreens from 'screens/AuthScreens'
import UnAuthScreens from 'screens/UnAuthScreens'
import { firebase } from 'configs/firebaseConfig'
// import Loading from 'components/Loading'
import { useLoading } from './stores/loading-context'

export const AppNavigator = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const { show, hide } = useLoading()

  useEffect(() => {
    show()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true)
        setCurrentUser(user)
      } else {
        setIsLogin(false)
        setCurrentUser(null)
      }
      hide()
    })
  }, [isLogin, currentUser])

  return (
    <>
      {/* <Loading loading={load} /> */}
      {!isLogin ? <UnAuthScreens /> : <AuthScreens />}
    </>
  )
}
