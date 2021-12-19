import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Text } from '@ui-kitten/components'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30
  },
  smsRow: {
    flex: 1,
    justifyContent: 'flex-start'
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
    fontSize: 16,
    paddingLeft: 10
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',

    marginLeft: 25
  }
})

const Address = ({ onPressAddress, address }) => (
  <TouchableOpacity onPress={() => onPressAddress(address)}>
    <View style={[styles.container]}>
      <View style={styles.iconRow}>
        <MaterialIcons
          name='place'
          underlayColor='transparent'
          style={styles.emailIcon}
          onPress={() => onPressAddress()}
        />
      </View>
      <View style={styles.emailRow}>
        <View style={styles.emailColumn}>
          <Text style={styles.emailText}>{address}</Text>
        </View>
      </View>
      <View style={styles.smsRow}>
        <MaterialIcons
          name='edit'
          underlayColor='transparent'
          style={styles.smsIcon}
          onPress={() => onPressAddress(address)}
        />
      </View>
    </View>
  </TouchableOpacity>
)

export default Address
