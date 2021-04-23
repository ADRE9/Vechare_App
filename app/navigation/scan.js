import React from 'react';
import {Image} from 'react-native';
import  styled from 'styled-components';



const Container = styled.View`
  height: 70px;
  width: 60px;
  border-radius: 250px;
  background: white;
  justify-content: center;
  align-items: center;
  elevation: 20;
`;

const InnerContainer = styled.View`
  height: 48px;
  width: 110px;
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

const Title = styled.Text`
  font-size: 10px;
  
`

function ScanButton({tintcolor}) {
  return (
    <Container>
      <HiddenBox />
      <InnerContainer>
        <Image source={require('../assets/chargebottom.png')}  style={{width:20,height:30,bottom:4 ,tintColor:tintcolor}} />
        {/*<Image source={require('../assets/Union.png')} />*/}
        <Title>CHARGE</Title>
      </InnerContainer>
    </Container>
  );
}

export default ScanButton;
