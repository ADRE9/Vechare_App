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
        resizeMode="cover"
      />
      <Text style={styles.heading}>Confirm Payment</Text>
      <Text style={styles.sub}>
        Please pay your dues from last charging session.
      </Text>
      <View flexDirection="row">
        <View>
          <Text style={styles.subtxt}>
            To continue using the veCharge, please pay
          </Text>
        </View>
        <View>
          <Text style={styles.txt}>₹ {amount}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Image
          source={require('../assets/unpayment.png')}
          style={{
            height: hp('5%'),
            width: wp('30%'),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 440,
  },
  btn: {
    position: 'absolute',
    marginTop: windowWidth > 350 ? 180 : 140,
    marginLeft: 30,
  },
  txt: {
    position: 'absolute',
    marginTop: -120,
    marginLeft: 270,
    fontSize: windowWidth > 350 ? 24 : 20,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  heading: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 30,
    fontSize: windowWidth > 350 ? 24 : 20,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  sub: {
    position: 'absolute',
    marginTop: 92,
    marginLeft: 30,
    fontSize: windowWidth > 350 ? 16 : 13,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Medium',
  },
  subtxt: {
    position: 'absolute',
    marginTop: -110,
    marginLeft: 32,
    fontSize: windowWidth > 350 ? 12 : 9,
    color: 'white',
    fontFamily: 'SF-Pro-Display-Medium',
  },
});

export default UnpaidNotify;
