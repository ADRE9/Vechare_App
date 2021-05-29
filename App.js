import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import AuthNavigation from './app/navigation/AuthNavigation';
import AppBottomNavigation from './app/navigation/AppBottomNavigation';

import Payment from './app/screens/Payment';

import Profile from './app/screens/Profile';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import BillingScreen from './app/screens/BillingScreen';
import FinalChargeDetails from './app/screens/FinalChargeDetails';
import Unpaid from './app/components/Unpaid';

import PaymentNavigation from './app/navigation/PaymentNavigation';
import DetailNavigation from './app/navigation/DetailNavigation';


const Stack = createStackNavigator();
function App() {
  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="AppBottom" component={AppBottomNavigation} />
        <Stack.Screen name="Pay" component={PaymentNavigation} />
        <Stack.Screen name="PayDetail" component={DetailNavigation} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="RegisterPage" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
