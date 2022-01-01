import React from 'react'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TopNavigationAction, Layout } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ChatIcon = props => (
  <AntDesign
    {...props}
    name='wechat'
    size={26}
    color={'#E26740'}
    style={{ marginRight: 5 }}
  />
)
const CartIcon = props => (
  <AntDesign {...props} name='shoppingcart' size={26} color={'#E26740'} />
)
const signIn = () => {
  navigation.navigate(SIGN_IN_SCREEN)
}
const renderRightActions = order => {
  const navigation = useNavigation()
  const userReducer = useSelector(state => {
    return state.userState.userInfo
  })
  return (
    <React.Fragment>
      {!order ? null : (
        <TopNavigationAction
          icon={CartIcon}
          onPress={
            userReducer?.uid ? () => navigation.navigate('OrderScreen') : signIn
          }
        />
      )}
      <TopNavigationAction
        icon={ChatIcon}
        onPress={
          userReducer?.uid ? () => navigation.navigate('ChatScreen') : signIn
        }
      />
    </React.Fragment>
  )
}
export { renderRightActions }
