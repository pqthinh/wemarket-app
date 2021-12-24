import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  container: {},
  imagePicker: {
    borderColor: '#e5e5ea',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginHorizontal: 5,
    marginVertical: 10,
    minWidth: 120
  },
  imageItem: {
    height: '100%',
    width: 120,
    resizeMode: 'cover',
    borderRadius: 10
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  userImage: {
    marginRight: 12
  },
  icon: {
    height: 30,
    width: 24,
    color: '#E26740',
    backgroundColor: '#fff'
  },
  auto: {
    marginHorizontal: 5
  },
  title: {
    fontSize: 14
  },
  imageDes: {
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 20,
    marginHorizontal: 5
  },
  label: { fontSize: 14, fontWeight: '700' },
  paddingVertical: {
    marginVertical: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imgCategory: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  }
})
