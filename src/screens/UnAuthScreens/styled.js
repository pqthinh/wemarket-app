import styled from 'styled-components/native'
import { TouchableOpacity, View, ImageBackground } from 'react-native'
import { Layout, Input, Button, Text } from '@ui-kitten/components'
import { IconAtoms } from 'components'

export const Container = styled(Layout)`
  margin: auto;
  height: 100%;
  width: 100%;
`

export const InputControl = styled(Input)``

export const TextLink = styled(TouchableOpacity)``

export const WrapperButton = styled(Button)`
  display: flex;
  flex: 1;
  border-radius: 10px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: 0;
  align-items: center;
`
export const NextButton = styled(Button)`
  display: flex;
  flex: 1;
  border-radius: 10px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: 0;
  align-items: center;
  padding: 0;
  width: 80px;
  margin-left: 10px;
`
export const DoneButton = styled(View)`
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  align-items: center;
  color: ${props => props.theme.colors.white};
  padding: 5px 2px;
  flex-wrap: nowrap;
`
export const WrapperText = styled(Text)`
  color: white;
`
export const Background = styled(ImageBackground)`
  flex: 1;
  opacity: 0.9;
  resize-mode: contain;
`
export const Icon = styled(IconAtoms)`
  color: ${props => props.theme.colors.white};
`
