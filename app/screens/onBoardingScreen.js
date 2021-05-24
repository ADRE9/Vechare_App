import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {Button} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Screen1, NextBtn, Screen2, Screen3, Screen4} from 'svg';

const dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? '#069DFF' : '#DBDBDB';

  return (
    <View
      style={{
        width: wp('1.8%'),
        height: hp('1%'),
        marginHorizontal: 5,
        backgroundColor,
        marginBottom: 250,
        marginTop: -wp('8%'),
        borderRadius: wp('2.6%') / 2,
      }}
    />
  );
};

const Next = ({...props}) => (
  <Button
    title="NEXT"
    {...props}
    containerStyle={{
      marginLeft: wp('10%'),
      marginBottom: hp('10%'),
      marginRight: wp('10%'),
    }}
    buttonStyle={{height: hp('7%'), width: wp('80%')}}
    titleStyle={{fontFamily: 'SF-Pro-Text-Bold'}}
  />
);

function OnBoardingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Onboarding
        DotComponent={dots}
        showSkip={false}
        bottomBarHighlight={false}
        NextButtonComponent={Next}
        titleStyles={{fontSize: 30, fontWeight: 'bold', bottom: 200}} // set default color for the title
        subTitleStyles={{color: 'white'}}
        onDone={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginPage'}],
          })
        }
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Screen1
                width={wp('100%')}
                height={hp('50%')}
                marginBottom={140}
              />
            ),
            title: 'CHECK PRICES',
            subtitle: '1',
            containerStyles: {paddingBottom: 30},
          },
          {
            backgroundColor: '#fff',
            image: (
              <Screen2
                width={wp('100%')}
                height={hp('50%')}
                marginBottom={140}
              />
            ),
            title: 'PRE-BOOK STATIONS',
            subtitle: '1',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Screen3
                width={wp('100%')}
                height={hp('50%')}
                marginBottom={140}
              />
            ),
            title: 'CONTROL & MONITOR',
            subtitle: '1',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Screen4
                width={wp('100%')}
                height={hp('50%')}
                marginBottom={140}
              />
            ),
            title: 'JOIN OUR NETWORK',
            subtitle: '1',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextImage: {
    width: wp('80%'),
    height: hp('8'),
    marginTop: hp('4%'),
  },
});

export default OnBoardingScreen;
