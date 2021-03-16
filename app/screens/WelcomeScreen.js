import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';

import valerio from '../assets/valerio.jpeg';

function WelcomeScreen({navigation}) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setTimeout(() => {
        navigation.replace('RegisterPage'); // Stack Name
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.replace('LoginPage'); // Stack Name
      }, 3000);
    }
  });

  return (
    <View style={styles.container}>
      <Image source={valerio} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default WelcomeScreen;
