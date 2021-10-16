import React from 'react'

export const LoadingContext = React.createContext({
  loading: false,
  show: () => {},
  hide: () => {}
})

export const useLoading = () => React.useContext(LoadingContext)
