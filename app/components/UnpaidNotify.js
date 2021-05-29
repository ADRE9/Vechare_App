import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowWidth);
console.log(windowHeight);

function UnpaidNotify({onPress, amount}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/fail.png')}
        style={{width: wp('100%'), height: hp('35%')}}
        resizeMode="cover">
        <Text style={styles.heading}>Confirm Payment</Text>
        <Text style={styles.sub}>
          Please pay your dues from last charging session.
        </Text>
        <View flexDirection="row">
          <Text style={styles.subtxt}>
            To continue using the veCharge, please pay
          </Text>

          <Text style={styles.txt}>₹ {amount}</Text>
        </View>

        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Image
            source={require('../assets/unpayment.png')}
            style={{
              height: 40,
              width: 130,
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  btn: {
    marginLeft: 30,
    marginTop: 15,
  },
  txt: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: windowWidth > 350 ? 24 : 20,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  heading: {
    marginTop: 60,
    marginLeft: 30,
    fontSize: windowWidth > 350 ? 24 : 20,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  sub: {
    marginLeft: 30,
    fontSize: windowWidth > 350 ? 16 : 13,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Medium',
  },
  subtxt: {
    marginTop: 25,
    marginLeft: 32,
    fontSize: windowWidth > 350 ? 12 : 9,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Medium',
  },
});

export default UnpaidNotify;
