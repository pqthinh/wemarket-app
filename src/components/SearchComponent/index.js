import { Icon, Input } from '@ui-kitten/components'
import { useDebounce } from 'hooks'
import React from 'react'
import { StyleSheet } from 'react-native'

const SearchComponent = ({ init, onSearch, onChangeData, ...other }) => {
  const [value, setValue] = React.useState(init)
  const searchInput = useDebounce(value, 3000)

  React.useEffect(() => {
    if (typeof onChangeData === 'function') onChangeData(searchInput)
  }, [searchInput])

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
      onChangeText={value => setValue(value)}
      accessoryRight={() => (
        <Icon name='image' fill='#E26740' style={styles.icon} />
      )}
      accessoryLeft={() => (
        <Icon
          name='search'
          fill='#E26740'
          style={styles.icon}
          onPress={() => onSearch(value)}
        />
      )}
      style={styles.input}
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
