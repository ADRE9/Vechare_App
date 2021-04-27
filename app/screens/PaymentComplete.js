import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function PaymentComplete({navigation}) {
  setTimeout(() => {
    navigation.replace('Details'); // Stack Name
  }, 3000);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/payment success.json')}
      />
      <Text style={styles.txt}>Payment Successful</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: hp('70%'),
    marginLeft: wp('15%'),
  },
});

export default PaymentComplete;
