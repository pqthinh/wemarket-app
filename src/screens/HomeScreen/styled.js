import { Layout } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const ProductContainer = styled(Layout)`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
`
export const ScreenContainer = styled(Layout)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
`
