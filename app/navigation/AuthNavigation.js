import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import QRScreen from '../screens/QRScreen';
import VerifyCode from '../screens/VerifyCode';
import Status from '../screens/Status';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginPage" component={LoginScreen} />
      <Stack.Screen name="Verify" component={VerifyCode} />
      <Stack.Screen name="RegisterPage" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
