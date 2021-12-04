import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, Icon } from '@ui-kitten/components'

const Fallback = ({ error, resetError }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Có lỗi xuất hiện</Text>
    <Text>{error.toString()}</Text>
    <Button
      style={styles.button}
      onPress={resetError}
      status='danger'
      accessoryLeft={<Icon name='refresh-outline' size={20} />}
    >
      Tải lại
    </Button>
  </View>
)
export default Fallback

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 40
  },
  button: {
    borderRadius: 5,
    color: '#fff'
  }
})
