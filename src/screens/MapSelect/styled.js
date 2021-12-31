import { StyleSheet, Dimensions } from 'react-native'

export default styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  },
  map: {
    flex: 1
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: 'red'
  },
  detailSection: {
    flex: 1.5,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    width: Dimensions.get('window').width - 30,
    position: 'absolute',
    bottom: 130,
    borderRadius: 20,
    backgroundColor: '#197CFF',
    marginLeft: 'auto',
    height: '12%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  }
})
