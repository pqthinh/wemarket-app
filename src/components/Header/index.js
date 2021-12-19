import React from 'react'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { TopNavigationAction, Layout } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'

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
const renderRightActions = () => {
  const navigation = useNavigation()
  return (
    <React.Fragment>
      <TopNavigationAction icon={CartIcon} />
      <TopNavigationAction
        icon={ChatIcon}
        onPress={() => navigation.navigate('ChatScreen')}
      />
    </React.Fragment>
  )
}
export { renderRightActions }
