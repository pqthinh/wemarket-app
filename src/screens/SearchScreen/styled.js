import { Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const ProductContainer = styled(Layout)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
