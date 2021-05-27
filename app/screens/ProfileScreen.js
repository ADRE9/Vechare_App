/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, Overlay, Rating, AirbnbRating} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

import {RazorpayApiKey} from '../Constants/config';
import files from '../../assets/filesBase64';
import UnpaidNotify from '../components/UnpaidNotify';

import {
  ProfileHeader,
  Loc,
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Host,
  Icon5,
  Icon6,
  Logout,
  Facebook,
  AppStore,
  Instagram,
  Twitter,
  LinkedIn,
  Web,
  PlayStore,
  Visit,
  Visit1,
} from 'svg';
import {BoxShadow} from 'react-native-shadow';

export default function Profile({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <ProfileHeader width={'100%'} height={200} />
          <Text style={styles.textCont}>Aanya jain</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textCont: {
    fontSize: 28,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'SF-Pro-Text-Bold',
    backgroundColor: 'red',
  },
});
