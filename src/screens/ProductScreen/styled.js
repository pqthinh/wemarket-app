import styled from 'styled-components'
import { IconAtoms } from 'components'
import { StyleSheet } from 'react-native'

export const Icon = styled(IconAtoms)``

export const styles = StyleSheet.create({
  container: { flex: 1 },
  IconWrapper: {
    flexDirection: 'row',
    marginHorizontal: 5,
    color: '#000',
    height: 24,
    width: 24
  },
  blockName: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
    overflow: 'hidden'
  },
  money: { color: 'red', fontSize: 18, fontWeight: '700' },
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
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 30
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  time: {
    fontWeight: '600'
  },
  sharing: {
    marginVertical: 20
  },
  sharingContent: {
    fontSize: 16,
    fontWeight: '700'
  }
})
