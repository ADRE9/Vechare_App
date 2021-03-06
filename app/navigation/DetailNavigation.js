import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import FinalChargeDetails from '../screens/FinalChargeDetails';
import BillingScreen from '../screens/BillingScreen';
import Report from '../screens/Report';
import PaymentComplete from '../screens/PaymentComplete';

const Stack = createStackNavigator();

const DetailNavigation = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{headerShown: false}}
      initialRouteName="PayDone">
      <Stack.Screen name="PayDone" component={PaymentComplete} />
      <Stack.Screen name="Details" component={FinalChargeDetails} />
      <Stack.Screen name="Receipt" component={BillingScreen} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};

export default DetailNavigation;
