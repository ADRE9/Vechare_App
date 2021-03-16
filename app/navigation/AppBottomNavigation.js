import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import home from '../screens/home';
// import Payment from '../screens/Payment';
import Profile from '../screens/Profile';

const EmptyScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

const AppBottomNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: '#8eb1c6',
      activeTintColor: 'white',
      inactiveBackgroundColor: '#FCCB45',
      inactiveTintColor: 'black',
      showLabel: false,
    }}>
    <Tab.Screen
      name="Home"
      component={home}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons name="home-outline" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Pay"
      component={EmptyScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <FontAwesome name="rupee" size={30} color={color} />
        ),
      }}
      listeners={({navigation}) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate('Payment');
        },
      })}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons
            name="account-outline"
            size={30}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppBottomNavigation;
