import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Text } from '@ui-kitten/components'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  emailIcon: {
    color: '#75BCFF',
    fontSize: 30
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200'
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  emailText: {
    fontSize: 16
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center'
  }
})

const Email = ({ onPressEmail, email }) => (
  <View style={[styles.container]}>
    <View style={styles.iconRow}>
      <Icon
        name='email'
        underlayColor='transparent'
        iconStyle={styles.emailIcon}
        onPress={() => onPressEmail()}
      />
    </View>
    <View style={styles.emailRow}>
      <View style={styles.emailColumn}>
        <Text style={styles.emailText}>{email}</Text>
      </View>
    </View>
  </View>
)

export default Email
