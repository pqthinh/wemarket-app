import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
//import {BookNow, BookNowButton, ButtonText} from '../styles';
import {usePlace} from '../context/PlacesManager';


const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
  justify-content: flex-end;
  margin-top: 500px;
  height: 200px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: #717171;
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
`;

const TextBold = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5px;
`;
const BookNow = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const BookNowButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #f4e22c;
  padding: 10px;
  border-radius: 20px;
  width: 100%;
  margin-left: auto;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
export default function DepartureInformation() {
  const {
    place: {currentPlace},
  } = usePlace();

  return (
    <Container >
      <Row>
        <FeatherIcon name="map-pin" size={20} color="gray" />
        <Text>Departure address</Text>
      </Row>

      <Row>
        <FeatherIcon name="more-vertical" size={20} color="gray" />
        <TextBold>{currentPlace.description}</TextBold>
      </Row>

      <BookNow>
        <BookNowButton
          onPress={() => console.log('pressed')}
          testID="book-now-button">
          <ButtonText>Book now</ButtonText>
        </BookNowButton>
      </BookNow>
    </Container>
  );
}