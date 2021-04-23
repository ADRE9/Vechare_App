/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? '#069DFF' : '#DBDBDB';

  return (
    <View
      style={{
        width: wp('2.6%'),
        height: hp('1.5%'),
        marginHorizontal: 5,
        backgroundColor,
        marginBottom: 250,
        borderRadius: wp('2.6%') / 2,
      }}
    />
  );
};

const Next = ({...props}) => (
  <TouchableHighlight style={styles.next} {...props}>
    <Image source={require('../assets/next.png')} style={styles.nextImage} />
  </TouchableHighlight>
);
function onBoardingScreen({navigation}) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  next: {
    marginBottom: 70,
    width: wp('80%'),
    marginRight: 30,
  },
  nextImage: {
    width: wp('80%'),
    height: hp('8%'),
  },
  image: {
    width: wp('100%'),
    height: hp('50%'),
    marginBottom: 140,
  },
});

export default onBoardingScreen;
