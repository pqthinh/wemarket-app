import { useNavigation } from '@react-navigation/native'
import { Button, Card, Modal, Text } from '@ui-kitten/components'
import { withBoolean } from 'exp-value'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { SIGN_IN_SCREEN } from 'utils/ScreenName'

const ModalLogin = () => {
  const navigation = useNavigation()
  const userReducer = useSelector(state => {
    return state.userState
  })

  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setVisible(!withBoolean('userInfo', userReducer))
    return () => setVisible(false)
  }, [userReducer.userInfo])

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Card disabled={true} style={styles.card}>
        <Text>Chào mừng đến Wemarket 😻</Text>
        <Text style={{ marginVertical: 20 }}>
          Bạn cần đăng nhập trước khi muốn sử dụng chức năng này
        </Text>
        <Button
          style={{ marginTop: 40 }}
          onPress={() => {
            navigation.navigate(SIGN_IN_SCREEN)
            setVisible(false)
          }}
        >
          Đăng nhập
        </Button>

        <Text
          style={{
            marginVertical: 10,
            color: '#2F80ED',
            textAlign: 'center'
          }}
          onPress={() => {
            setVisible(false)
            navigation.goBack()
          }}
        >
          Trở lại
        </Text>
      </Card>
    </Modal>
  )
}

export default ModalLogin

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 40
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
