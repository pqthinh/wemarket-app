import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Layout, Text } from '@ui-kitten/components'
const PostScreen = () => (
  <Layout style={styles.container}>
    <Text category='h4'>Chưa có bài viết nào</Text>
  </Layout>
)
export default PostScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    marginVertical: 8
  }
})
