import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../components/Card';
import Recent from '../components/Recent';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {details, recentDetails} from '../Constants/DumyData';
import Carousel from '../components/Carousel';
import CarouselRecent from '../components/CarouselRecent';

export default function Home({navigation}) {
  // const [paid, setPaid] = useState([]);
  // const [amount, setAmount] = useState([]);
  // const [name, setName] = useState([]);

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
  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <View>
          <ImageBackground
            source={require('../assets/chargeScreen.png')}
            style={{width: wp('100%'), height: hp('18%')}}
            resizeMode="cover">
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
                  fontSize: 28,
                  color: 'white',
                  marginRight: wp('47%'),
                  marginBottom: wp('20%'),
                  fontFamily: 'SF-Pro-Text-Bold',
                }}>
                Hello Moksh,
              </Text>
            </View>
          </ImageBackground>
        </View>
        {/* <View
          style={{
            marginTop: -50,
            marginLeft: 10,
            marginRight: 10,
          }}
        > */}
        {/* <Searchbar
            placeholder="Search for Charging Ports"
            icon={<Feather name="search" size={40} color="#D2D2D2" />}
            iconColor="#D2D2D2"
            style={{ borderRadius: 25 }}
          /> */}
        {/* </View> */}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Host')}
            activeOpacity={0.6}
            style={{marginLeft: wp('15%'), marginTop: -wp('1%')}}>
            <Image
              source={require('../assets/host.png')}
              style={{
                width: wp('70%'),
                height: hp('10%'),
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
                fontSize: wp('5.2%'),
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
          {/*<ScrollView style={{ marginTop: -wp("2%") }}>*/}
          {/*  <FlatList*/}
          {/*    data={details}*/}
          {/*    keyExtractor={(details) => details.id}*/}
          {/*    horizontal={true}*/}
          {/*    renderItem={({ item }) => (*/}
          {/*      <Card status={item.status} dis={item.dis} loc={item.loc} />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</ScrollView>*/}
        </View>
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontSize: 25,
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
              style={{marginLeft: wp('7%'), marginTop: wp('6%')}}>
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
          {/*<ScrollView style={{ marginTop: -wp("2%") }}>*/}
          {/*  <FlatList*/}
          {/*    data={recentDetails}*/}
          {/*    keyExtractor={(details) => details.id}*/}
          {/*    horizontal={true}*/}
          {/*    renderItem={({ item }) => (*/}
          {/*      <Recent days={item.days} dis={item.dis} loc={item.loc} />*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</ScrollView>*/}
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
