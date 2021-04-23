import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function RegisterScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/valerio-logo.png')}
        resizeMode="contain"
        style={{
          width: wp('30%'),
          height: hp('30%'),
          marginLeft: wp('32%'),
          marginTop: wp('3%'),
        }}
      />
      <Image
        source={require('../assets/signup-text.png')}
        resizeMode="contain"
        style={{width: wp('60%'), height: hp('10%'), marginLeft: wp('10%')}}
      />
      <View style={{marginTop: wp('8%'), marginLeft: wp('10%')}}>
        <Text style={{fontSize: wp('5%'), color: '#7C7C7C'}}>Username</Text>
        <TextInput
          placeholder="Enter Name"
          style={{
            color: 'black',
            borderBottomWidth: 1,
            borderBottomColor: '#E2E2E2',
            marginRight: wp('10%'),
          }}
        />
      </View>

      <View style={{marginTop: wp('4%'), marginLeft: wp('10%')}}>
        <Text style={{fontSize: wp('5%'), color: '#7C7C7C'}}>Email</Text>
        <TextInput
          placeholder="Enter Email Address"
          style={{
            color: '#030303',
            borderBottomWidth: 1,
            borderBottomColor: '#E2E2E2',
            marginRight: wp('10%'),
          }}
        />
      </View>
      <Text
        style={{
          marginTop: wp('6%'),
          marginLeft: wp('10%'),
          fontSize: wp('3.6%'),
          color: '#7C7C7C',
        }}>
        By continuing you agree to our{' '}
        <Text style={{color: '#069DFF'}}>Terms of Service </Text>
        and <Text style={{color: '#069DFF'}}>Privacy Policy.</Text>
      </Text>
      <TouchableOpacity onPress={() => navigation.replace('AppBottom')}>
        <Image
          source={require('../assets/signupBtn.png')}
          resizeMode="contain"
          style={{width: wp('60%'), height: hp('18%'), marginLeft: wp('20%')}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterScreen;
