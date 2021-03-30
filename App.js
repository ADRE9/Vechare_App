import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import AuthNavigation from './app/navigation/AuthNavigation';
import AppBottomNavigation from './app/navigation/AppBottomNavigation';
import Payment from './app/screens/Payment';
import Profile from './app/screens/Profile';
import LoginScreen from './app/screens/LoginScreen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    RNBootSplash.hide({duration: 250});
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="AppBottom" component={AppBottomNavigation} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LoginPage" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
