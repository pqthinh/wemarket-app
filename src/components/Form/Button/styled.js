import styled from 'styled-components/native'

export const WrapperButton = styled.TouchableOpacity`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 4px;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 10px auto;
  width: 95%;
`

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  padding: 5px;
`
