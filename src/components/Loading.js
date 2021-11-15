import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  View,
  StyleSheet
} from 'react-native'

const Loading = ({ loading }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={loading}>
      <View style={styles.modalView}>
        <ActivityIndicator size='large' color='#E26740' />
      </View>
    </Modal>
  )
}

export default Loading

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    top: Dimensions.get('screen').height / 2 - 50,
    left: Dimensions.get('screen').width / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
