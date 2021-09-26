import React, { useCallback, useMemo } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './src/navigation'
import { ThemeContext } from './src/stores/theme-context'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import LightTheme from './src/configs/theme/LightTheme'

export default () => {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }, [theme])

  const themeColors = useMemo(() => {
    return { ...DefaultTheme, ...LightTheme }
  }, [theme])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <NavigationContainer theme={themeColors}>
            <AppNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  )
}
