import React from 'react'
import { View } from 'react-native'
import { Text, Layout, Icon } from '@ui-kitten/components'
import { Avatar } from 'react-native-elements'
import { styles } from './styles'
import { withNumber } from 'exp-value'

const UserPreviewComponent = ({ user }) => {
  return (
    <Layout style={styles.userRow}>
      <View style={styles.userImage}>
        <Avatar
          rounded
          size='small'
          source={{
            uri:
              user?.avatar ||
              'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
          }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>
          {user?.username}
        </Text>
        <Text style={styles.title}>{user?.email}</Text>
      </View>
      <View
        style={[
          styles.rating,
          { justifyContent: 'flex-end', flex: 1, alignItems: 'center' }
        ]}
      >
        <Icon
          name='star'
          fill='#FCD265'
          animation='shake'
          style={styles.icon}
        />
        <Text style={styles.star}>{`${
          withNumber('star', user) || '5'
        }/5`}</Text>
      </View>
    </Layout>
  )
}

export default UserPreviewComponent
