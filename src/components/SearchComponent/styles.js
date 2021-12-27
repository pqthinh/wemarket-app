import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  Container: {
    flex: 0.6,
    backgroundColor: `#ffffff`,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10
  },
  title: {
    marginVertical: 2,
    fontSize: 15,
    fontWeight: 'bold'
  },
  icon: {
    width: 110
  },
  categoryName: {
    fontSize: 12,
    marginVertical: 3
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1
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
  BookNow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  BookNowButton: {
    alignItems: 'center',
    backgroundColor: '#197CFF',
    padding: 10,
    borderRadius: 20,
    marginLeft: 'auto',
    width: '100%',
    justifyContent: 'center'
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
  ButtonCancel: {
    marginBottom: 10,
    marginTop: -15,
    marginLeft: -10
  },
  ButtonCancelText: {
    color: `#000`,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right'
  }
})
