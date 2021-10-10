import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { LoadingContext } from '../stores/loading-context'
import Loading from 'components/Loading'

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        show: () => setLoading(true),
        hide: () => setLoading(false)
      }}
    >
      <>
        {loading && <Loading loading={loading} />}
        {children}
      </>
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.node
}
