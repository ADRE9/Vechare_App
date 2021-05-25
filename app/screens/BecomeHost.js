import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BecomeHostBtn} from 'svg';

function BecomeHost(props) {
  return (
    <SafeAreaView style={styles.cont}>
      <TouchableOpacity
        style={{
          marginTop: hp('4%'),
          marginLeft: wp('6%'),
        }}>
        <Image
          source={require('../assets/Back4.png')}
          style={{
            height: hp('4 % '),
            width: wp('7.3 % '),
          }}
        />
      </TouchableOpacity>
      <Text style={styles.header}></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 26,
  },
});

export default BecomeHost;
