import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useCache from 'hooks/useCache'
import { ThemeContext } from 'stores/theme-context'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [showRealApp, setShowRealApp] = useState(false)
  const { set, get } = useCache

  const onShowRealApp = useCallback(async () => {
    setShowRealApp(true)
    await set('show_introduce_app', true)
  }, [showRealApp])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
  }, [theme])

  useEffect(async () => {
    const show_introduce_app = await get('show_introduce_app')
    setShowRealApp(!!show_introduce_app)
  }, [])

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
