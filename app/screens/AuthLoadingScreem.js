import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Background from '../components/Background';
import {theme} from '../Constants/theme';
import LottieView from 'lottie-react-native';

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
      {/* {mail === id
        ? navigation.reset({
            index: 0,
            routes: [{name: 'RegisterPage'}],
          })
        : null} */}
    </Background>
  );
};

export default AuthLoadingScreen;
