import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BillingScreen from '../screens/BillingScreen';
import Report from '../screens/Report';
import FinalChargeDetails from '../screens/FinalChargeDetails';
import Payment from '../screens/Payment';
import PaymentComplete from '../screens/PaymentComplete';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Pay"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="Pay" component={Payment} />
      <Stack.Screen name="PayDone" component={PaymentComplete} />
      <Stack.Screen name="Details" component={FinalChargeDetails} />
      <Stack.Screen name="Receipt" component={BillingScreen} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
