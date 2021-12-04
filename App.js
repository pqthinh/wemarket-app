import * as eva from '@eva-design/eva'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import LoadingAtoms from 'components/LoadingAtoms'
import LightTheme from 'configs/theme/LightTheme'
import { default as mapping } from 'configs/theme/mapping.json'
import { default as themeEva } from 'configs/theme/theme.json'
import AppProvider from 'provider/AppProvider'
import LoadingProvider from 'provider/LoadingProvider'
import React, { useCallback, useMemo } from 'react'
import { LogBox } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from 'stores/store'
import { ThemeContext } from 'stores/theme-context'
import { ThemeProvider } from 'styled-components'
import { MaterialIconsPack } from './material-icons'
import { AppNavigator } from './src/AppNavigator'
import Fallback from './src/components/Fallback'

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
          <IconRegistry icons={[EvaIconsPack, MaterialIconsPack]} />
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
                  <ErrorBoundary
                    FallbackComponent={Fallback}
                    onError={e => {
                      console.log(e, 'error loafin')
                    }}
                  >
                    <NavigationContainer fallback={<LoadingAtoms />}>
                      <AppNavigator {...props} />
                    </NavigationContainer>
                  </ErrorBoundary>
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
