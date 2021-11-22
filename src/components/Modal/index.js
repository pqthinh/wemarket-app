import { Card, Modal } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

export const ModalWithBackdropShowcase = (visible, setVisible, ...rest) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true}>{children}</Card>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})
