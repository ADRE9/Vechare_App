import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Payment from '../screens/Payment';
import PaymentComplete from '../screens/PaymentComplete';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PayMent"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="PayMent" component={Payment} />
      <Stack.Screen name="PayDone" component={PaymentComplete} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
