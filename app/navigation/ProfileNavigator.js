import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedBack from '../screens/FeedBack';
import Profile from '../screens/Profile';
import Report from '../screens/Report';
import EditProfile from '../screens/EditProfile';
import WorkingScreen from '../screens/WorkingScreen';
import ReferScreen from '../screens/ReferScreen';
import About from '../screens/About';

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
      <Stack.Screen name="Feed" component={FeedBack} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Edit" component={EditProfile} />
      <Stack.Screen name="Work" component={WorkingScreen} />
      <Stack.Screen name="Refer" component={ReferScreen} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
