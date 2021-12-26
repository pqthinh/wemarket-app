import { Icon, Input } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

const SearchComponent = ({ value, onChangeData = () => {}, ...other }) => {
  return (
    <Input
      size='small'
      placeholder={'Tìm kiếm sản phẩm'}
      placeholderTextColor='#E26740'
      textStyle={{
        color: '#E26740',
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 5
      }}
      value={value}
      onChangeText={value => onChangeData(value)}
      accessoryRight={() => (
        <Icon name='image' fill='#E26740' style={styles.icon} />
      )}
      accessoryLeft={() => (
        <Icon name='search' fill='#E26740' style={styles.icon} />
      )}
      style={styles.input}
      // onPressIn={() => navigation.navigate('Search', {})}
      {...other}
    />
  )
}

export default SearchComponent

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    paddingHorizontal: 5
  },
  input: {
    width: 280
  }
})
