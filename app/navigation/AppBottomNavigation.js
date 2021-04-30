/* eslint-disable react-native/no-inline-styles */
import React, {focused} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';

import ScanButton from './scan';

import AppNavigation from './AppNavigation';
import ProfileNavigator from './ProfileNavigator';
import HomeNavigation from './Home Navigation';

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
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
      },
    }}>
    <Tab.Screen
      name="CHARGE"
      component={HomeNavigation}
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
  icon: {
    width: 37,
    height: 37,
    tintColor: focused ? '#069DFF' : '#000000',
  },
});

export default AppBottomNavigation;
