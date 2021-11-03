import styled from 'styled-components/native'
import { Text, Input } from '@ui-kitten/components'

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px auto;
  width: 95%;
  position: relative;
`
export const WrapperLabel = styled.View`
  flex: 1;
  justify-content: flex-start;
`
export const DangerText = styled.Text`
  color: ${props => props.theme.colors['color-danger-500']};
  position: absolute;
  top: 100%;
`
export const TextInput = styled(Input)``
export const TextLabel = styled(Text)``
