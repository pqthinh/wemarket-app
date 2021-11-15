import React, { useMemo, useCallback } from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './src/AppNavigator'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import LightTheme from 'configs/theme/LightTheme'
import LoadingProvider from 'provider/LoadingProvider'
import AppProvider from 'provider/AppProvider'
import { ThemeProvider } from 'styled-components'
import { ThemeContext } from 'stores/theme-context'
import { store, persistor } from 'stores/store'
import LoadingAtoms from 'components/LoadingAtoms'
import { default as themeEva } from 'configs/theme/theme.json'
import { default as mapping } from 'configs/theme/mapping.json'

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
    <Provider store={store}>
      <ThemeProvider theme={themeColors}>
        <PersistGate loading={<LoadingAtoms />} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <AppProvider>
            <ThemeContext.Provider
              value={{ theme: theme, toggleTheme: () => toggleTheme() }}
            >
              <LoadingProvider>
                <ApplicationProvider
                  {...eva}
                  theme={{ ...eva[theme], ...themeEva }}
                  customMapping={mapping}
                >
                  <NavigationContainer>
                    <AppNavigator {...props} />
                  </NavigationContainer>
                </ApplicationProvider>
              </LoadingProvider>
            </ThemeContext.Provider>
          </AppProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  )
}
export default App
