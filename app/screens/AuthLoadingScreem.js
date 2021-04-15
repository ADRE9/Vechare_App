import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import firebase from '@react-native-firebase/app';
import Background from '../components/Background';
import {theme} from '../Constants/theme';

const AuthLoadingScreen = ({navigation}) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.replace('AppBottom');
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
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text style={{fontSize: 30, fontWeight: 'bold'}}>
    //     Openning the app...
    //   </Text>
    // </View>
  );
};

export default AuthLoadingScreen;
