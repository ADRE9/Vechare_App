import React from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app';
import Background from '../components/Background';
import {theme} from '../Constants/theme';

const AuthLoadingScreen = ({navigation}) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.reset({
        index: 0,
        routes: [{name: 'AppBottom'}],
      });
    } else {
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginPage'}],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default AuthLoadingScreen;
