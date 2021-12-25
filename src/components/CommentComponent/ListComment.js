import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
  Layout
} from '@ui-kitten/components'
import { withEmpty } from 'exp-value'
import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Constant } from 'utils/constants'
import { styles } from './styles'

const VoteStar = ({ star }) => {
  return (
    <View style={styles.rating}>
      <Icon name='star' fill='#FCD265' animation='shake' style={styles.icon} />
      <Text style={styles.star}>{`${star}/5`}</Text>
    </View>
  )
}

const ItemImage = ({ avatar, ...props }) => {
  return (
    <Avatar
      {...props}
      style={styles.avatar}
      source={{ uri: avatar }}
      ImageComponent={ImageBackground}
    />
  )
}
const renderItem = ({ item, index }) => {
  return (
    <Layout style={styles.containerCommentItem} key={index}>
      <ListItem
        title={() => (
          <Text style={[styles.label, { marginLeft: 10 }]}>
            {withEmpty('username', item) || 'UI Kitten'}{' '}
          </Text>
        )}
        description={
          withEmpty('comment', item) || 'A set of React Native components'
        }
        accessoryLeft={props => (
          <ItemImage
            avatar={withEmpty('avatar', item) || Constant.defaultAvatar}
            {...props}
          />
        )}
        accessoryRight={() => <VoteStar star={withEmpty('star', item) || 4} />}
      />
      <Divider />
    </Layout>
  )
}

const ListComment = ({ listComments = new Array(3) }) => {
  return (
    <Layout style={{ marginBottom: 60 }}>
      <List
        style={styles.container}
        data={listComments}
        renderItem={renderItem}
      />
      <Divider />
    </Layout>
  )
}

export default ListComment
