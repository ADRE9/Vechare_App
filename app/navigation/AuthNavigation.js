import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import QRScreen from '../screens/QRScreen';
import VerifyCode from '../screens/VerifyCode';
import Status from '../screens/Status';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginPage" component={LoginScreen} />
      <Stack.Screen name="Verify" component={VerifyCode} />
      <Stack.Screen name="RegisterPage" component={RegisterScreen} />
      <Stack.Screen
        name="QrScreen"
        component={QRScreen}
        // options={({navigation}) => ({
        //   headerRight: () => (
        //     <Button
        //       onPress={() => navigation.navigate('Status')}
        //       title="Status"
        //       color="#00cc00"
        //     />
        //   ),
        //   headerShown: true,
        //   headerTitle: 'Home',
        //   headerTitleAlign: 'center',
        //   // headerLeft: () => (
        //   //   <HeaderBackButton onPress={() => navigation.navigate('QrScreen')} />
        //   // ),
        // })}
      />
      <Stack.Screen
        name="Status"
        component={Status}
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AppBottom')}
              title="Next"
              color="#00ca12"
            />
          ),
          headerShown: true,
          headerTitle: 'Status',
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
