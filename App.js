import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigation from './app/navigation/AuthNavigation';
import AppBottomNavigation from './app/navigation/AppBottomNavigation';

import Payment from './app/screens/Payment';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="AppBottom" component={AppBottomNavigation} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
