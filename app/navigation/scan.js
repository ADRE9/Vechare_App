import React from 'react';
import {Image, Text} from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  height: 77px;
  width: 68px;
  border-radius: 250px;
  background: white;
  justify-content: center;
  align-items: center;
  elevation: 20;
`;

const InnerContainer = styled.View`
  height: 49px;
  width: 122px;
  border-radius: 32px;
  background: white;
  justify-content: center;
  align-items: center;
`;

const HiddenBox = styled.View`
  height: 55px;
  width: 100px;
  background: white;
  position: absolute;
  bottom: 0;
`;

function ScanButton({tintcolor, color}) {
  return (
    <Container>
      <HiddenBox />
      <InnerContainer>
        <Image
          source={require('../assets/chargebottom.png')}
          style={{width: 20, height: 30, bottom: 4, tintColor: tintcolor}}
        />
        {/*<Image source={require('../assets/Union.png')} />*/}
        <Text style={{fontSize: 12, color: color}}>CHARGE</Text>
      </InnerContainer>
    </Container>
  );
}

export default ScanButton;
