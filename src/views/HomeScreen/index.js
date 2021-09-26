import { Button, Layout } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { ThemeContext } from '../../stores/theme-context'

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext)
  const { colors, ...p } = useTheme()
  console.log(colors, p)
  const navigateDetails = () => {
    navigation.navigate('Details')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
          OPEN DETAILS
        </Button>
        <Button
          style={{ marginVertical: 4 }}
          onPress={themeContext.toggleTheme}
        >
          TOGGLE THEME
        </Button>
      </Layout>
    </SafeAreaView>
  )
}
