import { StyleSheet, Dimensions } from 'react-native'
export const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  loading: {
    display: 'flex',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  noData: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    marginHorizontal: 10
  },
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  },
  title: {
    marginVertical: 2,
    fontSize: 15,
    fontWeight: 'bold'
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
})
