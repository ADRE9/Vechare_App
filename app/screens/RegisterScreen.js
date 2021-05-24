import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {nameValidator} from '../helpers/nameValidator';
import {numberValidator} from '../helpers/numberValidator';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

function RegisterScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [number, setNumber] = useState({value: '', error: ''});
  const [loading, setLoading] = useState();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const numberError = numberValidator(number.value);
    if (nameError || numberError) {
      setName({...name, error: nameError});
      setNumber({...number, error: numberError});
      return;
    }
    setLoading(true);
    const googletoken = await AsyncStorage.getItem('googletoken');
    const res = await axios.post(
      'https://vecharge.app/api/v1/users/signupWithGoogle',
      {
        token: googletoken,
        username: name.value,
        number: number.value,
      },
    );

    const token = res.data.data.token;
    try {
      await AsyncStorage.setItem('token', token).then(() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'AppBottom'}],
        }),
      );
    } catch (e) {
      console.log('error in token storing', e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/valerio-logo.png')}
        resizeMode="contain"
        style={{
          width: wp('30%'),
          height: hp('30%'),
          marginLeft: wp('32%'),
        }}
      />
      <Image
        source={require('../assets/signup-text.png')}
        resizeMode="contain"
        style={{width: wp('60%'), height: hp('10%'), marginLeft: wp('10%')}}
      />
      <View style={{marginTop: wp('4%'), marginLeft: wp('10%')}}>
        <Text style={{fontSize: wp('4%'), color: '#7C7C7C'}}>Username</Text>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
          placeholder={'Enter Name'}
        />
      </View>

      <View style={{marginTop: wp('4%'), marginLeft: wp('10%')}}>
        <Text style={{fontSize: wp('4%'), color: '#7C7C7C'}}>Phone Number</Text>
        <TextInput
          label="Number"
          returnKeyType="next"
          value={number.value}
          onChangeText={(text) => setNumber({value: text, error: ''})}
          error={!!number.error}
          errorText={number.error}
          placeholder={'Phone Number'}
          maxLength={10}
          keyboardType="phone-pad"
        />
      </View>
      <Text style={styles.condition}>
        By continuing you agree to our{' '}
        <Text style={{color: '#069DFF'}}>Terms of Service </Text>
        and <Text style={{color: '#069DFF'}}>Privacy Policy.</Text>
      </Text>
      {/* <TouchableOpacity activeOpacity={0.6} onPress={onSignUpPressed}>
        <Image
          source={require('../assets/signupBtn.png')}
          resizeMode="contain"
          style={{width: wp('60%'), height: hp('18%'), marginLeft: wp('20%')}}
        />
      </TouchableOpacity> */}
      <Button
        loading={loading}
        mode="contained"
        onPress={onSignUpPressed}
        uppercase={false}
        style={{marginTop: 24, backgroundColor: '#069DFF'}}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  condition: {
    marginTop: wp('3%'),
    marginLeft: wp('10%'),
    fontSize: wp('3.3%'),
    marginRight: wp('3%'),
    color: '#7C7C7C',
  },
  phone: {
    color: '#030303',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    marginRight: wp('10%'),
  },
  name: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    marginRight: wp('10%'),
  },
});

export default RegisterScreen;
