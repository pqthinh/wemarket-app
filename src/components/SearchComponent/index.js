import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const SearchComponent = ({
  navigation,
  value,
  onChangeData,
  children,
  placeholder,
  ...other
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather name='search' size={24} color='#000' />
      </View>
      <TextInput
        placeholder={placeholder || 'Tìm kiếm sản phẩm'}
        placeholderTextColor='#000'
        style={styles.searchInput}
        value={value}
        onChangeText={value => onChangeData(value)}
        {...other}
      />
      {children}
    </View>
  )
}

export default SearchComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#e0ffb1',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 0,
    borderRadius: 10,
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 10
  },
  searchInput: {
    fontSize: 14,
    marginRight: 20,
    width: 140
  }
})
