import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomBackLight from '../components/CustomBackLight';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function About({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}> About </Text>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
        }}
        onPress={() => navigation.goBack()}>
        <CustomBackLight />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <View>
          <Text style={styles.line1}>App Version 2.1.1 (21052021)</Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Terms')}>
        <View>
          <Text style={styles.line2}>Terms of Service</Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Privacy')}>
        <View>
          <Text style={styles.line2}>Privacy Policy</Text>
          <View style={styles.line}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: '#3E3E3E',
    fontSize: 26,
    fontFamily: 'SF-Pro-Display-Bold',
    marginLeft: wp('20%'),
    marginTop: hp('2%'),
  },
  line1: {
    fontFamily: 'SF-Pro-Text-Regular',
    color: '#515050',
    marginLeft: wp('8%'),
    marginTop: hp('8%'),
  },
  line2: {
    fontFamily: 'SF-Pro-Text-Regular',
    color: '#515050',
    marginLeft: wp('8%'),
    marginTop: hp('2%'),
  },
  line: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 0.6,
    width: wp('85%'),
    marginLeft: hp('3%'),
    marginTop: hp('2%'),
  },
});

export default About;
