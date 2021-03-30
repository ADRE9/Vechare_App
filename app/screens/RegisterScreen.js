/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import firebase from '@react-native-firebase/app';

import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import Toast from '../components/Toast';
import Colors from '../Constants/Colors';

function RegisterScreen({navigation}) {
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     navigation.navigate('AppBottom');
  //   } else {
  //     navigation.navigate('RegisterPage');
  //   }
  // });
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  // const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
    }
  };

  return (
    <Background>
      <Image source={require('../assets/vl.png')} style={styles.image} />

      <Header>Please Complete Your Profile</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput label="Vechicle No." returnKeyType="next" />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24, backgroundColor: Colors.primaryColor}}>
        Save
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AppBottom')}
        style={{marginTop: 24, backgroundColor: Colors.darkColor}}>
        Skip
      </Button>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.darkColor,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 200,
    borderRadius: 250,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    height: 200,
  },
});

export default RegisterScreen;
