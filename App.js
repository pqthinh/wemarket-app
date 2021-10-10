import React, { useMemo, useCallback } from 'react'
import { LogBox, Text } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './src/AppNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import LightTheme from 'configs/theme/LightTheme'
import LoadingProvider from 'provider/LoadingProvider'
import AppProvider from 'provider/AppProvider'
import { ThemeContext } from 'stores/theme-context'

LogBox.ignoreLogs([`Setting a timer for a long period`])
LogBox.ignoreAllLogs()

const App = props => {
  const themeColors = useMemo(() => {
    return { ...DefaultTheme, ...LightTheme }
  }, [theme])

  const [theme, setTheme] = React.useState('light')

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }, [theme])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AppProvider>
        <ThemeContext.Provider
          value={{ theme: theme, toggleTheme: () => toggleTheme() }}
        >
          <LoadingProvider>
            <ApplicationProvider {...eva} theme={eva[theme]}>
              <NavigationContainer theme={themeColors}>
                <AppNavigator {...props} />
              </NavigationContainer>
            </ApplicationProvider>
          </LoadingProvider>
        </ThemeContext.Provider>
      </AppProvider>
    </>
  )
}
export default App
