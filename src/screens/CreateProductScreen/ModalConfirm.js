import { Button, Card, Modal, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

const ModalConfirm = ({ data, visible, setVisible }) => {
  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Card disabled={true} style={styles.card}>
        <Text style={{ fontWeight: '700' }}>
          Xác nhận đăng bài lên Wemarket 😻
        </Text>
        <Text style={{ marginVertical: 20 }}>
          Sản phẩm sau khi đăng lên sẽ đợi kiểm duyệt từ quản trị hệ thống
        </Text>
        <Button
          style={{ marginTop: 40 }}
          onPress={() => {
            console.log(data)
            setVisible(false)
          }}
        >
          Xác nhận
        </Button>

        <Text
          style={{
            marginVertical: 10,
            color: '#2F80ED',
            textAlign: 'center'
          }}
          onPress={() => {
            setVisible(false)
          }}
        >
          Hủy
        </Text>
      </Card>
    </Modal>
  )
}

export default ModalConfirm

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
