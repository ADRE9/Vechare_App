import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import Background from '../components/Background';
import {theme} from '../Constants/theme';

const AuthLoadingScreen = ({navigation}) => {
  function onAuthStateChanged(user) {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'AppBottom'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginPage'}],
      });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  console.log('auth loading screen');
  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default AuthLoadingScreen;
