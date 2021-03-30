/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(6,157,255,1.00)' : ' rgba(0, 0, 0, 0.8)';
  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 5,
        backgroundColor,
        marginBottom: 220,
      }}
    />
  );
};

const Next = ({...props}) => (
  <TouchableOpacity style={styles.next} {...props}>
    <Text style={{fontSize: 20, color: '#fff'}}>Next</Text>
  </TouchableOpacity>
);
function onBoardingScreen({navigation}) {
  return (
    <Onboarding
      DotComponent={dots}
      showSkip={false}
      bottomBarHighlight={false}
      NextButtonComponent={Next}
      titleStyles={{fontSize: 30, fontWeight: 'bold', bottom: 200}} // set default color for the title
      onDone={() => navigation.replace('LoginPage')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/screen1.png')}
              style={styles.image}
            />
          ),
          title: 'CHECK PRICES',
          containerStyles: {paddingBottom: 30},
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/screen2.png')}
              style={styles.image}
            />
          ),
          title: 'PRE-BOOK STATIONS',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/screen3.png')}
              style={styles.image}
            />
          ),
          title: 'CONTROL & MONITOR',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../assets/screen4.png')}
              style={styles.image}
            />
          ),
          title: 'JOIN OUR NETWORK',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  next: {
    marginRight: 50,
    backgroundColor: '#069DFF',
    width: 300,
    height: 50,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 140,
  },
});

export default onBoardingScreen;
