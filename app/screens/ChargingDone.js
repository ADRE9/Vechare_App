import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function ChargingDone({navigation}) {
  setTimeout(() => {
    // navigation.replace('Pay'); // Stack Name
    navigation.reset({
      index: 0,
      routes: [{name: 'Pay'}],
    });
  }, 2000);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/charging.json')}
      />
      <Text style={styles.txt}>Charging Completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: hp('73%'),
    marginLeft: wp('20%'),
  },
});

export default ChargingDone;
