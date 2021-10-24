import styled from 'styled-components/native'
import { View } from 'react-native'
export const LoadingWrapper = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`
export const LoadingBox = styled(View)`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.05);
`
