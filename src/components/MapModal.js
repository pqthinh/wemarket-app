import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native'
import Modal from 'react-native-modal'
import NumberFormat from 'react-number-format'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome5'
// var screen = Dimensions.get('window');
export default MapModal = props => {
  return (
    <Modal
      isVisible={props.modalVisible}
      style={styles.modal}
      coverScreen={false}
      hasBackdrop={false}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      onSwipeComplete={props.close}
    >
      <View style={styles.Container}>
        <View style={styles.Row}>
          <Text style={styles.TextBold}>{props.product.name}</Text>
        </View>
        <View style={styles.Row}>
          <Image
            style={styles.image_product}
            source={{ uri: `${props.product.image}` }}
          ></Image>
          <View style={styles.information}>
            <View style={styles.info_row}>
              <FeatherIcon name='dollar-sign' size={20} color='gray' />
              <Text style={styles.text_price}>
                <NumberFormat
                  value={props.product.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' đ'}
                  renderText={formattedValue => <Text>{formattedValue}</Text>}
                />
              </Text>
            </View>
            <View style={styles.info_row}>
              <FeatherIcon name='map-pin' size={20} color='gray' />
              <Text numberOfLines={2} style={styles.text}>
                {props.product.place}
              </Text>
            </View>
            <View style={styles.info_row}>
              <FeatherIcon name='user' size={20} color='gray' />
              <Text style={styles.text_name}>{props.product.name_user}</Text>
            </View>
            <View style={styles.info_row}>
              <FeatherIcon name='star' size={20} color='gray' />
              <Text style={styles.text}>{props.product.star}</Text>
            </View>
          </View>
        </View>

        <View style={styles.BookNow}>
          <TouchableOpacity
            style={styles.DirectButton}
            // onPress={props.close}
            onPress={() => props.setOpenDirection(true)}
          >
            <Icon name='directions' size={20} color='white' />
            <Text style={styles.ButtonText}>Đường đi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MessageButton} onPress={props.close}>
            <FeatherIcon name='message-square' size={20} color='white' />
            <Text style={styles.ButtonText}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SaveButton} onPress={props.close}>
            <FeatherIcon name='bookmark' size={20} color='white' />
            <Text style={styles.ButtonText}>Quan tâm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  // }
}
const styles = StyleSheet.create({
  Container: {
    flex: 0.3,
    backgroundColor: `#ffffff`,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
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
  BookNow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  DirectButton: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#1260DB',
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    width: '100%',
    flex: 1 / 3,
    marginRight: 10,
    justifyContent: 'center'
  },
  MessageButton: {
    alignItems: 'center',
    backgroundColor: `#E26740`,
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    width: '100%',
    flex: 1 / 3,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  SaveButton: {
    alignItems: 'center',
    backgroundColor: '#FCD265',
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    width: '100%',
    flex: 1 / 3,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ButtonText: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  image_product: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    flex: 0.3
  },
  information: {
    flex: 0.7
  },
  info_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text_name: {
    color: `black`,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600'
  },
  text_price: {
    color: '#E26740',
    fontSize: 20,
    marginLeft: 5,
    fontWeight: '600'
  }
})
