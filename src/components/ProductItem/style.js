import { Dimensions, StyleSheet } from 'react-native'

const heightImage =
  Platform.OS == 'android' ? 150 : Platform.OS == 'ios' ? 120 : 180
const STICKY_ITEM_BACKGROUNDS = ['#01579B', '#9CCC65']
const WIDTH = Dimensions.get('screen').width

const styles = StyleSheet.create({
  image: {
    width: heightImage,
    height: heightImage,
    overflow: 'hidden',
    padding: 5,
    margin: 5
  },
  titleOfImage: {
    fontWeight: '400',
    color: '#000',
    fontSize: 14
  },
  DivTitle: {
    fontSize: 16,
    marginLeft: Platform.OS == 'web' ? 20 : 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600'
  },
  news: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 5,
    width: WIDTH / 2 - 20,
    position: 'relative'
  },
  itemSticky: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: STICKY_ITEM_BACKGROUNDS[1],
    height: '20%',
    borderRadius: 50
  },
  auth: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontWeight: '500',
    color: '#fff',
    fontSize: 10,
    width: 80,
    flexWrap: 'wrap',
    flex: 1
  },
  stickyAvatar: {
    position: 'absolute',
    top: 5,
    left: 5
  },
  count: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 30,
    height: 30
  },
  countImg: {
    width: 30,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  numImg: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 4,
    backgroundColor: '#000',
    position: 'absolute',
    paddingHorizontal: 5,
    top: 2,
    right: 0,
    borderRadius: 5
  },
  titlePost: {
    fontWeight: '400',
    color: '#000',
    fontSize: 18
  },
  viewNewsPosted: {
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerNewsPost: {
    borderWidth: 0.25,
    borderColor: '#e0e0e0',
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    width: '90%'
  },
  details: {
    marginHorizontal: 10
  },
  stickyItem: {
    width: '100%',
    padding: 0,
    marginVertical: 0,
    resizeMode: 'stretch',
    height: '100%'
  }
})

export default styles
