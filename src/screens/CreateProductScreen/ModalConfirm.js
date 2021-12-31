import { Button, Card, Modal, Text } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from 'actions/productActions'
import { withBoolean } from 'exp-value'

const ModalConfirm = ({
  data,
  visible,
  setVisible,
  setData,
  setFile,
  setTagInput,
  setSelectedIndex,
  setSelectedStatus,
  initialData
}) => {
  const dispatch = useDispatch()

  const createProductState = useSelector(state => state.createProduct)
  useEffect(() => {
    if (withBoolean('product', createProductState)) {
      setVisible(false)
      setData(initialData)
      setFile([])
      setTagInput()
      setSelectedIndex()
      setSelectedStatus()
    }
  }, [createProductState])

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
            dispatch(createProduct(data))
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
