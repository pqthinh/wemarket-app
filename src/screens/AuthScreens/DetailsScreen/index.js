import React from 'react'
import { SafeAreaView } from 'react-native'
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { CHAT_SCREEN } from '../../../utils/ScreenName'

const BackIcon = props => <Icon {...props} name='arrow-back' />

export const DetailsScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='MyApp'
        alignment='center'
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text category='h1'>DETAILS</Text>
        <Text onPress={() => navigation.navigate(CHAT_SCREEN)}>Go to chat</Text>
      </Layout>
    </SafeAreaView>
  )
}
