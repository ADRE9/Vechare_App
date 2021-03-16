import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Payment from '../screens/Payment';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
