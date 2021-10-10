import { createDrawerNavigator } from '@react-navigation/drawer'
import { Text } from 'react-native'

const Drawer = createDrawerNavigator()

function Feed() {
  return <Text>Feed</Text>
}

function Article() {
  return <Text>Article</Text>
}

export default function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Feed' component={Feed} />{' '}
      <Drawer.Screen name='Article' component={Article} />{' '}
    </Drawer.Navigator>
  )
}
