import { Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'
import IconAtoms from '../IconAtoms'
import NumberFormatComponent from '../NumberFormatComponent'
import { Dimensions } from 'react-native'
const WIDTH = Dimensions.get('screen').width

export const Container = styled(Layout)`
  width: ${WIDTH / 2 - 20};
  background-color: ${props => props.theme.colors.background};
  margin: 10px;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  position: relative;
  padding: 1px;
`

export const WrapperContentProduct = styled.View`
  margin: 5px 10px;
`

export const ImageProduct = styled.Image`
  width: 100%;
  height: 150px;
  resize-mode: cover;
  margin: 0 0 5px 0;
  border-radius: 4px;
  padding: 2px;
`
export const NameProduct = styled(Text)`
  font-size: 16px;
  font-weight: 700;
`

export const Price = styled(NumberFormatComponent)`
  font-size: 18px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.primary} !important;
`

export const WrapperIcon = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const Place = styled(Text)`
  width: 100px;
`

export const PostTime = styled(Text)``
export const Icon = styled(IconAtoms)`
  margin-right: 10px;
`
export const TopProduct = styled.Image`
  position: absolute;
  top: 4px;
  right: 3px;
  resize-mode: contain;
  width: 35px;
  height: 40px;
`
export const TopLikeProduct = styled.Image`
  background: ${props => props.theme.colors['color-primary-400']};
  height: 20px;
  width: 60px;
  position: absolute;
  top: 4px;
  left: 4px;
  resize-mode: contain;
`
export const TrustTag = styled(Text)`
  background: ${props => props.theme.colors.gray[1]};
  font-size: 14px;
  height: 20px;
  position: absolute;
  top: 125px;
  left: 4px;
  color: ${props => props.theme.colors.white};
`
