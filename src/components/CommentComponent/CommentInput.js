import React from 'react'
import { Input, Text, Layout, Divider } from '@ui-kitten/components'
import { styles } from './styles'

const CommentInput = ({ comment, setComment }) => {
  return (
    <>
      <Divider />
      <Layout style={{ padding: 10 }}>
        <Input
          name='comment'
          multiline={true}
          value={comment}
          label={() => <Text style={styles.label}>Bình luận: </Text>}
          placeholder='Bình luận về sản phẩm: '
          onChangeText={setComment}
          textStyle={{ minHeight: 50 }}
        />
      </Layout>
    </>
  )
}

export default CommentInput
