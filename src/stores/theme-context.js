import React from 'react'

export const ThemeContext = React.createContext({
  theme: 'light',
  showRealApp: false,
  toggleTheme: () => {},
  onShowRealApp: () => {}
})
