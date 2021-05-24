/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert, BackHandler, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import RNLocation from 'react-native-location';
import {Login, Google} from 'svg';

function LoginScreen(props) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      // Add Event Listener for hardwareBackPress
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  // const [name, setName] = useState([]);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

      const currentUser = await GoogleSignin.getCurrentUser();
      // setName(currentUser);
      await AsyncStorage.setItem('name', currentUser.user.name);
      await AsyncStorage.setItem('mail', currentUser.user.email);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      console.log('idToken by google', idToken);
      token(idToken);
      await auth()
        .signInWithCredential(credential)
        .then(() =>
          props.navigation.reset({
            index: 0,
            routes: [{name: 'AppBottom'}],
          }),
        );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  function onAuthStateChanged(user) {
    setUser(user);

    if (user) {
      setloggedIn(true);
    }
  }

  const token = async function (idToken) {
    const res = await axios.post(
      'https://vecharge.app/api/v1/users/loginWithGoogle',
      {
        token: idToken,
      },
    );
    const tokendata = res.data;
    // console.log('token from backend', tokendata);

    try {
      await AsyncStorage.setItem('token', tokendata);
    } catch (e) {
      console.log('error in token storing', e);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '792432651607-oh2kvqvrcgc94n6jfco0cg5af4csbr4l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const [viewLocation, isViewLocation] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
        },
      });

      console.log(permission);

      let location;
      if (!permission) {
        permission = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
            rationale: {
              title: 'We need to access your location',
              message: 'We use your location to show where you are on the map',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });
        console.log(permission);
        location = await RNLocation.getLatestLocation({timeout: 2000});
        // console.log(location);
        isViewLocation(location);
      } else {
        location = await RNLocation.getLatestLocation({timeout: 2000});
        // console.log(location);
        isViewLocation(location);
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: hp('33%')}}>
        <Login width={wp('70%')} height={hp('36%')} />
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'SF-Pro-Display-Semibold',
            fontWeight: 'bold',
            color: 'black',
            marginTop: hp('3%'),
            marginLeft: wp('5%'),
          }}>
          Charge your vehicle {'\n'}with veCharge
        </Text>
      </View>

      <View style={{position: 'absolute', top: 420, left: wp('19%')}}>
        <Google width={wp('52%')} height={hp('10')} onPress={() => _signIn()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },
});

export default LoginScreen;
