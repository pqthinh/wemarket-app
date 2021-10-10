import React from 'react'

export const AppContext = React.createContext({
  showRealApp: false,
  onShowRealApp: () => {}
})

export const useApp = () => React.useContext(AppContext)
