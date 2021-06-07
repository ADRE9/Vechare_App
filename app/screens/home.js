import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {BoxShadow} from 'react-native-shadow';
import axios from 'axios';

import loader from '../components/loader';
import Carousel from '../components/Carousel';
import CarouselRecent from '../components/CarouselRecent';
import {HomeScreen, Host, More} from 'svg';

export default function Home({navigation}) {
  const [name, setName] = useState([]);
  const [load, setLoad] = useState(false);
  const [mail, setMail] = useState('');
  const [id, setId] = useState('');

  const shadowOpt = {
    width: wp('62%'),
    height: hp('5.6%'),
    color: '#069DFF',
    border: 12,
    // radius: 6,
    opacity: 0.2,
    x: 14,
    y: 23,
    style: {marginBottom: hp('8%')},
  };

  // function signDetails() {
  //   if (mail === id) {
  //     Alert.alert(
  //       'Sign Up',

  //       'Please complete the sign up to access app',
  //       [
  //         {
  //           text: 'Sign Up',
  //           onPress: () =>
  //             navigation.reset({
  //               index: 0,
  //               routes: [{name: 'RegisterPage'}],
  //             }),
  //         },
  //       ],
  //       {cancelable: false},
  //       //clicking out side of alert will not cancel
  //     );
  //   }
  // }

  useEffect(() => {
    loader.loading((v) => setLoad(true));
    async function value() {
      const user = await AsyncStorage.getItem('name');
      setName(user.split(' ')[0]);
    }
    async function get() {
      const idToken = await AsyncStorage.getItem('googletoken');
      const res = await axios.post(
        'https://vecharge.app/api/v1/users/loginWithGoogle',
        {
          token: idToken,
        },
      );
      const tokenmail = res.data.data.email;

      const mailId = await AsyncStorage.getItem('mail');
      if (tokenmail === mailId) {
        await AsyncStorage.setItem('googletoken', idToken);
        navigation.navigate('RegisterPage');
      }
    }

    value();
    get();
    console.log('home SCreen');
  });

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <ImageBackground
          source={require('../assets/homeHeader.png')}
          style={{
            width: wp('100%'),
            height: 150,
          }}>
          <Text
            style={{
              fontSize: 28,
              color: 'white',
              marginTop: 20,
              marginLeft: 30,
              fontFamily: 'SF-Pro-Text-Bold',
            }}>
            Hello {name},
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              fontFamily: 'SF-Pro-Text-Regular',
              marginLeft: 30,
            }}>
            Let's Charge your Vehicle
          </Text>
        </ImageBackground>

        <TouchableOpacity
          onPress={() => navigation.navigate('Host')}
          activeOpacity={0.6}
          style={{
            alignItems: 'center',
            marginTop: -10,
          }}>
          <Image
            source={require('../assets/hostProfile.png')}
            style={{
              height: 70,
              width: 270,
            }}
          />
        </TouchableOpacity>

        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
                fontSize: 22,
                marginLeft: 20,
                marginTop: 10,
              }}>
              Charging Points Near Me
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Station')}
              activeOpacity={0.5}
              style={{
                marginLeft: wp('6%'),
                marginTop: 10,
              }}>
              <More width={wp('20%')} height={hp('3.8%')} />
            </TouchableOpacity>
          </View>
        </View>
        <Carousel onPress={() => navigation.navigate('SCAN')} />
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontSize: 22,
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
              }}>
              Recent Sessions
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Session')}
              activeOpacity={0.5}
              style={{marginLeft: wp('10%'), marginTop: wp('3%')}}>
              <More width={wp('20%')} height={hp('3.8%')} />
            </TouchableOpacity>
          </View>
        </View>
        <CarouselRecent onPress={() => navigation.navigate('SCAN')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
});
