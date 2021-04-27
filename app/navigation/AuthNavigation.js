import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyCode from '../screens/VerifyCode';
import onBoardingScreen from '../screens/onBoardingScreen';

import AuthLoadingScreen from '../screens/AuthLoadingScreem';

const Stack = createStackNavigator();

function AuthNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  // const [isloggedIn, setLogged] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator
        initialRouteName="onBoard"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthLoad" component={AuthLoadingScreen} />
        <Stack.Screen name="onBoard" component={onBoardingScreen} />
        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyCode} />
        <Stack.Screen name="RegisterPage" component={RegisterScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="AuthLoad"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthLoad" component={AuthLoadingScreen} />

        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyCode} />
        <Stack.Screen name="RegisterPage" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigation;
