import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  loading: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  noData: {
    fontSize: 16,
    fontWeight: '700'
  },
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  }
})
