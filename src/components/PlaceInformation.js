import React from "react"
import { Platform, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
export default function PlaceInformation() {
    return (
      <View style={styles.Container}>
        <View style={styles.Row}>
          <Text style={styles.Text}>Departure address</Text>
        </View>
  
        <View style={styles.Row}>
          <Text style={styles.text}>Lindholmen</Text>
        </View>
        <View style={styles.BookNow}>
        <TouchableOpacity style={styles.BookNowButton}
          onPress={() => console.log('pressed')}
          testID="book-now-button">
          <Text style={styles.ButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
  const styles = StyleSheet.create({ 
    Container: {
      flex: Platform.OS =='ios' ? 1.5 : 2.5,
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
    }
  }) 