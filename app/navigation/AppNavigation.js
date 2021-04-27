import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Status from '../screens/Status';
import QRScreen from '../screens/QRScreen';
import ChargingDone from '../screens/ChargingDone';

const Stack = createStackNavigator();

const AppNavigation = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="QrScreen"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="QrScreen" component={QRScreen} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Charging" component={ChargingDone} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
