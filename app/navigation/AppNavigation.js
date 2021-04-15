import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Status from '../screens/Status';
import QRScreen from '../screens/QRScreen';
import Payment from '../screens/Payment';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="QrScreen"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="QrScreen" component={QRScreen} />
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
