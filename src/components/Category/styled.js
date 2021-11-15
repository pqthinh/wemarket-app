import styled from 'styled-components/native'
import { Layout, Text } from '@ui-kitten/components'
import { Dimensions } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export const Wrapper = styled(Layout)`
  flex: 1;
  width: 100%;
  max-width: ${DEVICE_WIDTH}px;
  max-height: 350px;
  margin: 10px 0;
  padding: 0;
`
export const Title = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
  color: ${props => props.theme.colors.primary};
`
export const WrapperCategory = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 10px;
`

export const CategoryItem = styled.View`
  margin: 5px;
  border-radius: 5px;
  width: 105px;
  height: 140px;
  padding: 0 5px;
  position: relative;
`

export const ImageCategory = styled.Image`
  width: 80px;
  height: 80px;
`
export const TitleCategory = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  flex: 1;
  flex-wrap: wrap;
  margin: 0 5px;
  position: absolute;
  top: 100px;
`
