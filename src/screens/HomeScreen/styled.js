import { Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const ProductContainer = styled(Layout)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
export const ScreenContainer = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
  overflow: scroll;
  height: 100%;
  width: 100%;
`
export const NodataText = styled(Text)`
  color: ${props => props.theme.colors.red[1]};
  margin: 5px 20px 20px;
`
export const Section = styled(Layout)`
  margin: 10px 0;
`
export const SectionName = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
  color: ${props => props.theme.colors.primary};
`
