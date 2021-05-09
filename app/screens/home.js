import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNLocation from 'react-native-location';
import {BoxShadow} from 'react-native-shadow';

import {details, recentDetails} from '../Constants/DumyData';
import Carousel from '../components/Carousel';
import CarouselRecent from '../components/CarouselRecent';
import {HomeScreen, Host} from 'svg';

RNLocation.configure({
  distanceFilter: null,
});

export default function Home({navigation}) {
  // const [paid, setPaid] = useState([]);
  // const [amount, setAmount] = useState([]);
  const [name, setName] = useState([]);
  const [viewLocation, isViewLocation] = useState([]);

  const shadowOpt = {
    width: wp('60%'),
    height: hp('5%'),
    color: '#069DFF',
    border: 12,
    // radius: 6,
    opacity: 0.2,
    x: 12,
    y: 24,
    style: {marginBottom: hp('8%')},
  };
  // useEffect(() => {
  //   async function unpaid() {
  //     var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const res = await fetch(
  //       `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/unpaid`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     const resData = await res.json();
  //     setPaid(resData.data.payStatus);
  //     setAmount(resData.data.amount);

  //     console.log(resData.data.payStatus);
  //   }
  //   unpaid();
  // }, []);

  // useEffect(() => {
  //   async function connection() {
  //     var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const res = await fetch(
  //       `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/users/me`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     const resData = await res.json();
  //     setName(resData.data.name);
  //   }
  //   connection();
  // }, []);

  // if (paid === false) {
  //   return (
  //     <View>
  //       <Text>hello</Text>
  //     </View>
  //   );
  // }
  useEffect(() => {
    async function value() {
      const user = await AsyncStorage.getItem('name');
      setName(user);
      // console.log("name of user",user);
      // User Location
      let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
        },
      });

      console.log(permission);

      let location;
      if (!permission) {
        permission = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
            rationale: {
              title: 'We need to access your location',
              message: 'We use your location to show where you are on the map',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });
        console.log(permission);
        location = await RNLocation.getLatestLocation({timeout: 100});
        console.log(location);
        isViewLocation(location);
      } else {
        location = await RNLocation.getLatestLocation({timeout: 100});
        console.log(location);
        isViewLocation(location);
      }
    }
    value();
    console.log('home SCreen');
  }, []);
  // useEffect(() => {
  //   const getLocation = async () => {};
  //   getLocation();
  // }, []);

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <View>
          <HomeScreen width={wp('100%')} height={hp('22%')} />

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: wp('5%'),
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                marginRight: wp('34%'),
                marginBottom: wp('15%'),
                fontFamily: 'SF-Pro-Text-Bold',
              }}>
              Hello {name},
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Host')}
            activeOpacity={0.6}
            style={{marginLeft: wp('15%'), marginTop: -wp('6%')}}>
            <BoxShadow setting={shadowOpt}>
              <Host width={wp('70%')} height={hp('12%')} />
            </BoxShadow>
          </TouchableOpacity>
        </View>
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
                fontSize: wp('5%'),
                marginTop: wp('2%'),
                marginLeft: wp('5%'),
              }}>
              Charging Points Near Me
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Station')}
              activeOpacity={0.5}
              style={{marginLeft: wp('10%'), marginTop: wp('2%')}}>
              <Image
                style={{
                  width: wp('20%'),
                  height: hp('3%'),

                  borderRadius: wp('6%') / 2,
                }}
                source={require('../assets/more.png')}
              />
            </TouchableOpacity>
          </View>
          <Carousel data={details} />
        </View>

        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontSize: 22,
                marginTop: 15,
                marginLeft: 30,
                marginTop: 20,
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
              }}>
              Recent Sessions
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Session')}
              activeOpacity={0.5}
              style={{marginLeft: wp('10%'), marginTop: wp('6%')}}>
              <Image
                style={{
                  width: wp('20%'),
                  height: hp('3%'),

                  borderRadius: wp('6%') / 2,
                }}
                source={require('../assets/more.png')}
              />
            </TouchableOpacity>
          </View>
          <CarouselRecent data={recentDetails} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   color: "#34495e",
  // },
  activeCircle: {
    borderRadius: wp('7%') / 2,
    width: wp('2%'),
    height: hp('1%'),
    backgroundColor: '#069DFF',
    marginLeft: wp('42%'),
    marginTop: wp('3%'),
  },
  inactiveCircle: {
    borderRadius: wp('7%') / 2,
    width: wp('2%'),
    height: hp('1%'),
    backgroundColor: '#DBDBDB',
    marginLeft: wp('3%'),
    marginTop: wp('3%'),
  },
});
