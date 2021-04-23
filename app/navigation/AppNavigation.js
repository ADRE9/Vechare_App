import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Status from '../screens/Status';
import QRScreen from '../screens/QRScreen';
import Payment from '../screens/Payment';

const Stack = createStackNavigator();

const AppNavigation = ({navigation,route}) => {
  if( route.state && route.state.index > 1){
    navigation.setOptions({tabBarVisible : false})
  }
  else{
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <Stack.Navigator
      initialRouteName="QrScreen"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="QrScreen" component={QRScreen} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Pay" component={Payment} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
