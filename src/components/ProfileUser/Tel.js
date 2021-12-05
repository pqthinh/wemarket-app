import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import PropTypes from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 25
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30
  },
  smsRow: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 5
  },
  telIcon: {
    color: '#75BCFF',
    fontSize: 30
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200'
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  telNumberText: {
    fontSize: 16
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

const Tel = ({ phoneNumber, onPressTel }) => {
  return (
    <TouchableOpacity onPress={() => onPressTel(phoneNumber)}>
      <View style={[styles.container]}>
        <View style={styles.iconRow}>
          <MaterialIcons
            name='call'
            style={styles.telIcon}
            onPress={() => onPressTel(phoneNumber)}
          />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.smsRow}>
          <MaterialIcons
            name='edit'
            style={styles.smsIcon}
            onPress={() => onPressTel(phoneNumber)}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

Tel.propTypes = {
  phoneNumber: PropTypes.string,
  onPressSms: PropTypes.func.isRequired,
  onPressTel: PropTypes.func.isRequired
}

export default Tel
