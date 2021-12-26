import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerCommentItem: {
    marginTop: 10
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#ADF38E',
    display: 'flex',
    alignItems: 'baseline'
  },
  rating: {
    height: '100%',
    marginHorizontal: 2,
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20
  },
  star: {
    fontSize: 12,
    marginHorizontal: 5,
    fontWeight: '700'
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
  title: {
    fontSize: 14,
    fontWeight: '700'
  },
  label: { fontSize: 16, fontWeight: '700', paddingVertical: 5 },
  paddingVertical: {}
})
