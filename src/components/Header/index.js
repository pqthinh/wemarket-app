import { useNavigation } from '@react-navigation/native'
import { TopNavigationAction } from '@ui-kitten/components'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'

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
            userReducer?.uid
              ? () => navigation.navigate('OrderScreen')
              : () => navigation.navigate(SIGN_IN_SCREEN)
          }
        />
      )}
      <TopNavigationAction
        icon={ChatIcon}
        onPress={
          userReducer?.uid
            ? () => navigation.navigate('ChatScreen')
            : () => navigation.navigate(SIGN_IN_SCREEN)
        }
      />
    </React.Fragment>
  )
}
export { renderRightActions }
