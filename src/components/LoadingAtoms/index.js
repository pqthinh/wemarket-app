import React from 'react'
import { ActivityIndicator } from 'react-native'
import { LoadingBox, LoadingWrapper } from './styled'

const LoadingAtoms = () => {
  return (
    <LoadingWrapper>
      <LoadingBox>
        <ActivityIndicator size='large' color='#E26740' />
      </LoadingBox>
    </LoadingWrapper>
  )
}

export default React.memo(LoadingAtoms)
