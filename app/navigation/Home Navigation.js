import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import StationScreen from '../screens/StationScreen';
import SessionScreen from '../screens/SessionScreen';
import HostScreen from '../screens/HostScreen';
import RegisterHost from '../screens/RegisterHost';
import BecomeHost from '../screens/BecomeHost';
import QRScreen from '../screens/QRScreen';

const Stack = createStackNavigator();

const HomeNavigation = ({navigation, route}) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Station" component={StationScreen} />
      <Stack.Screen name="Session" component={SessionScreen} />
      <Stack.Screen name="Host" component={HostScreen} />
      <Stack.Screen name="RegisterHost" component={RegisterHost} />
      <Stack.Screen name="BecomeHost" component={BecomeHost} />
      <Stack.Screen name="QrScreen" component={QRScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
