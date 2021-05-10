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

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      // console.log('idToken by google', idToken);
      token(idToken);
      await auth().signInWithCredential(credential);
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
    const res = await fetch(
      'http://ec2-65-2-128-103.ap-south-1.compute.amazonaws.com/users/loginWithGoogle',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: idToken}),
      },
    );
    const tokendata = await res.json();
    // console.log(tokendata.data.token);

    try {
      await AsyncStorage.setItem('token', tokendata.data.token);
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/login.png')}
        style={{
          width: wp('75%'),
          height: hp('38%'),
        }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          marginVertical: 20,
        }}>
        Charge your vehicle {'\n'}with veCharge
      </Text>
      {!loggedIn ? (
        <GoogleSigninButton
          style={{width: 192, height: 48, marginBottom: 190}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
        />
      ) : (
        <View>{props.navigation.replace('RegisterPage')}</View>
      )}
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
