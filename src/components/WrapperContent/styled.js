import { Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'
import IconAtoms from '../IconAtoms'

export const Section = styled(Layout)`
  margin: 10px 0;
`
export const SectionName = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
  color: ${props => props.theme.colors.primary};
  text-transform: capitalize;
`
export const SectionContent = styled.ScrollView`
  flex: 1;
  flex-wrap: wrap;
`
export const LoadMoreWrapper = styled.TouchableOpacity`
  width: 100px;
  height: 160px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 10px;
`

export const Icon = styled(IconAtoms)`
  background: transparent;
  color: ${props => props.theme.colors.primary};
`
export const TextLoadMore = styled(Text)`
  color: ${props => props.theme.colors.primary};
`
