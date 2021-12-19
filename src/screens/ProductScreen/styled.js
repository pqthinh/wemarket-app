import styled from 'styled-components'
import { IconAtoms } from 'components'
import { StyleSheet } from 'react-native'

export const Icon = styled(IconAtoms)``

export const styles = StyleSheet.create({
  container: { flex: 1 },
  IconWrapper: { flexDirection: 'row', marginHorizontal: 5, color: '#000' },
  blockName: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
    width: '85%',
    overflow: 'hidden'
  },
  money: { color: 'red', textTransform: 'capitalize' },
  function: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 5
  },
  moreInfoUser: {
    borderColor: '#fe9900',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    width: 120,
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'center',
    marginHorizontal: 5,
    fontSize: 10
  },
  description: {
    padding: 10
  },
  commentInput: {},
  listComment: {},
  userComment: { fontSize: 14 },
  bottomScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff'
  },
  flexRow: {
    flexDirection: 'row',
    backgroundColor: '#59D843',
    color: '#000',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10
  }
})
