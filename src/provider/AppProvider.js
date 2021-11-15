import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useCache from 'hooks/useCache'
import { AppContext } from 'stores/app-context'

export default function AppProvider({ children }) {
  const [showRealApp, setShowRealApp] = useState(false)
  const { set, get } = useCache

  const onShowRealApp = useCallback(async () => {
    setShowRealApp(true)
    await set('show_introduce_app', true)
  }, [showRealApp])

  useEffect(async () => {
    const show_introduce_app = await get('show_introduce_app')
    setShowRealApp(!!show_introduce_app)
  }, [showRealApp])

  return (
    <AppContext.Provider
      value={{
        showRealApp: showRealApp,
        onShowRealApp: () => onShowRealApp()
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node
}
