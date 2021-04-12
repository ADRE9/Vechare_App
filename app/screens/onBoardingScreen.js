/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
        marginBottom: 310,
      }}
    />
  );
};

const Next = ({...props}) => (
  <TouchableOpacity style={styles.next} {...props}>
    <Image source={require('../assets/next.png')} style={styles.nextImage} />
  </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginRight: 40,
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
