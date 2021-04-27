import React, {focused} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';

import home from '../screens/home';
import ScanButton from './scan';

import AppNavigation from './AppNavigation';
import ProfileNavigator from './ProfileNavigator';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = () => (
  <Tab.Navigator
    initialRouteName="CHARGE"
    tabBarOptions={{
      activeTintColor: '#069DFF',
      inactiveBackgroundColor: '#FFFFFF',
      inactiveTintColor: 'black',
      showLabel: false,
      style: {
        backgroundColor: '#ffffff',
        height: 48,
        elevation: 20,
        shadowOffset: 20,
      },
    }}>
    <Tab.Screen
      name="CHARGE"
      component={home}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Explore.png')}
              resizeMode="contain"
              style={{
                width: 37,
                height: 37,
                tintColor: focused ? '#069DFF' : '#000000',
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="SCAN"
      component={AppNavigation}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ScanButton
              tintcolor={focused ? '#069DFF' : '#000000'}
              color={focused ? '#069DFF' : '#000000'}
            />
          </View>
        ),
      }}
    />

    <Tab.Screen
      name="ProfileScreen"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Profile.png')}
              resizeMode="contain"
              style={{
                width: 37,
                height: 37,
                tintColor: focused ? '#069DFF' : '#000000',
              }}
            />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  imageContainer: {
    width: 25,
    height: 25,
    tintColor: focused ? '#069DFF' : '#000000',
  },
});

export default AppBottomNavigation;
