import Stack from '../stack'

const PrivateScreenComponent = ({
  isAuthenticated,
  component,
  name,
  navigateToLogin
}) => {
  if (!isAuthenticated) {
    navigateToLogin()
    return null
  }
  return <Stack.Screen name={name} component={component} />
}

export default PrivateScreenComponent
