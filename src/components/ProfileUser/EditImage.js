import React, { useState } from 'react'
import {
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Text } from '@ui-kitten/components'
import Modal from 'react-native-modal'

export default EditImage = ({ isModalVisible, toggleModal }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modal}
      onBackdropPress={toggleModal}
      swipeDirection={['down']}
      onSwipeComplete={toggleModal}
    >
      <View style={styles.Container}>
        <View style={styles.iconRow}>
          <Icon
            name='horizontal-rule'
            underlayColor='transparent'
            iconStyle={styles.closeIcon}
            // onPress={toggleModal}
          />
        </View>
        <TouchableHighlight
          onPress={() => console.log('click')}
          underlayColor='lightgrey'
        >
          <View style={styles.Row}>
            <Icon
              name='images'
              type='entypo'
              containerStyle={styles.iconImage}
              // onPress={toggleModal}
            />
            <Text>Tải ảnh lên</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => console.log('click')}
          underlayColor='lightgrey'
        >
          <View style={styles.Row}>
            <Icon
              name='camera'
              type='entypo'
              containerStyle={styles.iconImage}
              // onPress={toggleModal}
            />
            <Text>Chụp ảnh</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 0.2,
    backgroundColor: `#ffffff`,
    paddingBottom: 20
    // paddingVertical: 20,
    // paddingHorizontal: 20
  },

  iconRow: {
    //flex: 1,
    justifyContent: 'center',
    marginTop: -15
  },
  closeIcon: {
    color: 'silver',
    fontSize: 50,
    borderRadius: 20
  },
  categoryName: {
    fontSize: 12,
    marginVertical: 3
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  text: {
    color: `#717171`,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '600'
  },
  TextBold: {
    color: `#000000`,
    fontSize: 20,
    marginLeft: 5,
    fontWeight: '600'
  },
  iconImage: {
    alignItems: 'center',
    backgroundColor: 'silver',
    borderColor: 'transparent',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 18,
    width: 44
  }
})
