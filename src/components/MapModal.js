import React, { useCallback, useState, useEffect } from 'react'
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { firebase } from 'configs/firebaseConfig'
import { addNewChat, findRoom } from 'actions/chatActions'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

import {
  getBookmarks,
  createBookmark,
  deleteBookmark
} from 'actions/bookmarkActions'
// var screen = Dimensions.get('window');
export default MapModal = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const messageReducer = useSelector(state => {
    return state.manageChat
  })

  const userReducer = useSelector(state => {
    return state.userState
  })

  let user = firebase.auth().currentUser

  const dispatchChat = useCallback(
    (me, friend) => {
      dispatch(findRoom(me, friend)), props.close()

      return navigation.navigate('Chat', {
        id: messageReducer.id,
        name: messageReducer.name
      })
    },
    [dispatch]
  )
  const handlePressCreate = useCallback(
    (uid, id) => {
      dispatch(createBookmark({ uid: uid, productId: id }))
      props.showToast()
    },
    [dispatch]
  )
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
        <View style={styles.iconRow}>
          <MaterialIcons
            name='horizontal-rule'
            size={50}
            color='silver'
            // onPress={toggleModal}
          />
        </View>
        <View style={styles.Row}>
          <Text numberOfLines={1} style={styles.TextBold}>
            {props.product.name}
          </Text>
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
              <Text numberOfLines={1} style={styles.text_name}>
                {props.product.name_user}
              </Text>
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
            onPress={() => {
              props.setOpenDirection(true)
              props.close()
            }}
          >
            <Icon name='directions' size={18} color='white' />
            <Text style={styles.ButtonText}>Đường đi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.MessageButton}
            onPress={() => dispatchChat(user, props.userChat)}
          >
            <FeatherIcon name='message-square' size={18} color='white' />
            <Text style={styles.ButtonText}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SaveButton}
            onPress={() =>
              handlePressCreate(userReducer.userInfo.uid, props.product.id)
            }
          >
            <FeatherIcon name='bookmark' size={18} color='white' />
            <Text style={styles.ButtonText}>Lưu bài</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  // }
}
const styles = StyleSheet.create({
  Container: {
    flex: 0.45,
    backgroundColor: `#ffffff`,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  iconRow: {
    flex: 0.19,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -35
  },
  BookNow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.19,
    justifyContent: 'flex-end',
    height: 50,

    height: '100%'
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
    marginLeft: 5,
    fontSize: 12
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
