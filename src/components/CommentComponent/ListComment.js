import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import {
  Avatar,
  ListItem,
  Text,
  List,
  Icon,
  Divider
} from '@ui-kitten/components'
import { withEmpty } from 'exp-value'
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
    <View style={styles.containerCommentItem} key={index}>
      <ListItem
        title='UI Kitten'
        description='A set of React Native components A set of React Native componentsA set of React Native componentsA set of React Native componentsA set of React Native components'
        accessoryLeft={props => (
          <ItemImage
            avatar={withEmpty('avatar', item) || Constant.defaultAvatar}
            {...props}
          />
        )}
        accessoryRight={() => <VoteStar star={withEmpty('star', item) || 4} />}
      />
      <Divider />
    </View>
  )
}

const ListComment = ({ listComments = new Array(10) }) => {
  return (
    <List
      style={styles.container}
      data={listComments}
      renderItem={renderItem}
    />
  )
}

export default ListComment
