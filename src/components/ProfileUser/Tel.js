import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Text } from '@ui-kitten/components'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center'
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start'
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
          <Icon
            name='call'
            underlayColor='transparent'
            iconStyle={styles.telIcon}
            onPress={() => onPressTel(phoneNumber)}
          />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.smsRow}>
          <Icon
            name='edit'
            underlayColor='transparent'
            iconStyle={styles.smsIcon}
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
