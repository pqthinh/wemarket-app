import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from '../stores/theme-context'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [showRealApp, setShowRealApp] = useState(false)

  const onShowRealApp = useCallback(() => {
    setShowRealApp(true)
  }, [showRealApp])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{ theme, showRealApp, toggleTheme, onShowRealApp }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}
