import React  from 'react';
import {
     Text, View, TouchableOpacity,
    Platform, StyleSheet, Dimensions, Button
} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
// var screen = Dimensions.get('window');
export default MapModal =(props)=> {
    
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
              <Text style={styles.TextBold}>Product</Text>
            </View>
            <View style={styles.Row}>
            <FeatherIcon name="map-pin" size={20} color="gray" />
            <Text style={styles.text}>{props.product.place}</Text>
            </View>
  
            
            <View style={styles.BookNow}>
            <TouchableOpacity style={styles.BookNowButton}
            onPress={props.close}
                  testID="book-now-button">
                <Text style={styles.ButtonText}>Book now</Text>
            </TouchableOpacity>
            </View>
            </View>              
            </Modal>
        );
    // }
}
const styles = StyleSheet.create({ 
    Container: {
      flex: 0.3,
      backgroundColor: `#ffffff`,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    Row: {
      flexDirection:"row",
      alignItems: 'center',
      marginBottom: 10
    },
    text: {
      color: `#717171`,
      fontSize: 14,
      marginLeft: 5,
      fontWeight: '600',
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
    BookNowButton: {
      alignItems: 'center',
      backgroundColor: '#f4e22c',
      padding: 10,
      borderRadius: 20,
      marginLeft: 'auto',
      width: '100%'
    },
    ButtonText: {
      fontWeight: 'bold',
      fontSize: 15
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
  }) 