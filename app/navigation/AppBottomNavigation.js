import React, {focused} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import home from '../screens/home';
// import Payment from '../screens/Payment';
import Profile from '../screens/Profile';
import QRScreen from '../screens/QRScreen';
import Status from '../screens/Status';

const Tab = createBottomTabNavigator();

const AppBottomNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#069DFF',
      inactiveBackgroundColor: '#FFFFFF',
      inactiveTintColor: 'black',
      showLabel: false,
      style: {
        backgroundColor: '#ffffff',
        height: 80,
      },
    }}>
    <Tab.Screen
      name="CHARGE"
      component={home}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Charge.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#069DFF' : '#000000',
              }}
            />
            <Text
              style={{color: focused ? '#069DFF' : '#000000', fontSize: 12}}>
              CHARGE
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="SCAN"
      component={QRScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Scan.png')}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: focused ? '#069DFF' : '#000000',
              }}
            />
            <Text
              style={{color: focused ? '#069DFF' : '#000000', fontSize: 12}}>
              SCAN
            </Text>
          </View>
        ),
      }}
    />
    {/* <Tab.Screen
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
    /> */}

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/Profile.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#069DFF' : '#000000',
              }}
            />
            <Text
              style={{color: focused ? '#069DFF' : '#000000', fontSize: 12}}>
              PROFILE
            </Text>
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
