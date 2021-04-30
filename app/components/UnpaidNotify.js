import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function UnpaidNotify({onPress, amount}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/unpaid.png')}
        style={{width: wp('100%'), height: hp('35%')}}
        resizeMode="cover"
      />
      <Text style={styles.txt}>₹ {amount}</Text>
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
    marginTop: 160,
    marginLeft: 30,
  },
  txt: {
    position: 'absolute',
    marginTop: 115,
    marginLeft: 250,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UnpaidNotify;
