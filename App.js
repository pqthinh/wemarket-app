import React, { useMemo } from 'react'
import { LogBox } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './src/AppNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import LightTheme from './src/configs/theme/LightTheme'
import LoadingProvider from './src/provider/LoadingProvider'
import ThemeProvider from './src/provider/ThemeProvider'
import { ThemeContext } from './src/stores/theme-context'

LogBox.ignoreLogs([`Setting a timer for a long period`])
LogBox.ignoreAllLogs()

const App = props => {
  const themeContext = React.useContext(ThemeContext)
  const themeColors = useMemo(() => {
    return { ...DefaultTheme, ...LightTheme }
  }, [themeContext.theme])

  return (
    <LoadingProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider>
        <ApplicationProvider {...eva} theme={eva[themeContext.theme]}>
          <NavigationContainer theme={themeColors}>
            <AppNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeProvider>
    </LoadingProvider>
  )
}
export default App
