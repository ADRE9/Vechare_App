import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedBack from '../screens/FeedBack';
import Profile from '../screens/Profile';
import Report from '../screens/Report';
import EditProfile from '../screens/EditProfile';
import WorkingScreen from '../screens/WorkingScreen';

import About from '../screens/About';
import HostScreen from '../screens/HostScreen';
import RegisterHost from '../screens/RegisterHost';
import BecomeHost from '../screens/BecomeHost';
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';

const Stack = createStackNavigator();

const ProfileNavigator = ({navigation, route}) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}
      mode="card">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Host" component={HostScreen} />
      <Stack.Screen name="RegisterHost" component={RegisterHost} />
      <Stack.Screen name="BecomeHost" component={BecomeHost} />
      <Stack.Screen name="Feed" component={FeedBack} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Edit" component={EditProfile} />
      <Stack.Screen name="Work" component={WorkingScreen} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
