import { connect, useSelector } from 'react-redux'
import PrivateScreenComponent from './PrivateScreenComponent'

const mapStateToProps = state => {
  useSelector(state => {
    return state.listProduct || {}
  })
  return {
    isAuthenticated: someAuthSelectors.getIsAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    navigateToLogin: dispatch(navigation.navigate('Login'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateScreenComponent)
