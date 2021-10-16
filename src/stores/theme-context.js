import React from 'react'

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
})

export const useTheme = () => React.useContext(ThemeContext)
