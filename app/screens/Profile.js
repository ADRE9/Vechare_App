/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
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
import { Button, Overlay, Rating, AirbnbRating } from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

import { RazorpayApiKey } from '../Constants/config';
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
} from 'svg';
import { BoxShadow } from 'react-native-shadow';

function Profile({ navigation }) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [paid, setPaid] = useState([]);
  const [amount, setAmount] = useState([]);
  const [name, setName] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visble, setVisble] = useState(false);
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const star = require('../assets/stars.png');
  const starfill = require('../assets/Vector.png');

  const Bar = () => {
    return (
      <View style={styles.customRatingStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              // style={{backgroundColor: 'yellow'}}
              onPress={() => setdefaultRating(item)}>
              <Image
                style={styles.starImgStyle}
                source={item <= defaultRating ? starfill : star}
              // source={star}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleplay = () => {
    setVisble(!visble);
  };

  const ratingCompleted = () => {
    console.log('rating');
  };

  const close = () => {
    setVisble(!visble);
    setVisible(!visible);
  };

  const Open = () => {
    Linking.openURL('market://details?id=com.whatsapp');
    //market://details?id=<<Package id>>
  };

  const OpenIOS = () => {
    Linking.openURL(
      'https://apps.apple.com/in/app/whatsapp-messenger/id310633997',
    );
  };

  const shadowOpt = {
    width: wp('52%'),
    height: hp('5%'),
    color: '#069DFF',
    border: 10,
    // radius: 6,
    opacity: 0.2,
    x: 30,
    y: 22,
    style: { marginBottom: hp('3%') },
  };
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await AsyncStorage.removeItem('ervl');
      auth()
        .signOut()
        .then(() => alert('You are signed out!'));
      setloggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const intsa = () => {
    const instagramURL = 'https://www.instagram.com/valerio_electric/';
    Linking.openURL(instagramURL);
  };
  const twitter = () => {
    const twit = 'https://twitter.com/ValerioElectric';
    Linking.openURL(twit);
  };
  const fb = () => {
    const facebook = 'https://www.facebook.com/ValerioElectric';
    Linking.openURL(facebook);
  };
  const linkedIn = () => {
    const link = 'https://www.linkedin.com/company/valerio-electric';
    Linking.openURL(link);
  };

  const website = () => {
    const web = 'https://www.valerioelectric.com/';
    Linking.openURL(web);
  };

  const sign = () => {
    Alert.alert('Sign Out', 'Do you wish to Sign out ?', [
      {
        text: 'Yes',
        onPress: () =>
          signOut().then(() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginPage' }],
            }),
          ),
      },
      {
        text: 'No',
        onPress: () => console.log('No'),
      },
    ]);
  };
  const onPay = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const order = await fetch(
      'http://ec2-13-232-193-20.ap-south-1.compute.amazonaws.com/payment/instantiatePayment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    const orderData = await order.json();

    console.log('order data value', orderData);

    var options = {
      description: 'Pending bill payment',
      curreny: 'INR',
      amount: orderData.amount_due,
      order_id: orderData.id,
      key: RazorpayApiKey,
      prefill: {
        email: 'useremail@example.com',
        contact: '9191919191',
        name: 'John Doe',
      },
      theme: { color: '#a29bfe' },
    };
    RazorpayCheckout.open(options).then(async function (response) {
      const config = {
        headers: { Authorization: token },
      };
      const data = {
        orderCreationId: orderData.id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      // console.log(data);
      console.log('unpaid SCreen');
      const result = await axios.post(
        'http://ec2-13-232-193-20.ap-south-1.compute.amazonaws.com/payment/madePayment',
        data,
        config,
      );
    });
  };

  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    if (user) {
      setloggedIn(true);
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '792432651607-oh2kvqvrcgc94n6jfco0cg5af4csbr4l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    async function unpaid() {
      var token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        'http://ec2-13-232-193-20.ap-south-1.compute.amazonaws.com/payment/unpaid',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const resData = await res.json();
      setPaid(resData.data.payStatus);
      setAmount(resData.data.amount);
      console.log(resData.data.payStatus);
    }
    unpaid();
  }, []);

  useEffect(() => {
    async function value() {
      const user = await AsyncStorage.getItem('name');
      setName(user);
      // console.log("name of user",user);
    }
    value();
  }, []);

  const share = async () => {
    const shareOptions = {
      message:
        'Are you the proud owner of an electric vehicle? \nOr are you thinking to buy one? \n \nCheck out veCharge - a mobile app to take care of all your EV needs! Locate charging points pre-book slots, monitor charging remotely & pay digitally for a seamless charging experience.\n \nPower up with veCharge ⚡\nDownload the app now ',
      url: files.image1,
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <ProfileHeader width={wp('100%')} height={hp('28%')} />
          <Text style={styles.textCont}>{name}</Text>
          <View flexDirection="column">
            <View flexDirection="row">
              <Loc
                height={hp('5%')}
                width={wp('4%')}
                position={'absolute'}
                top={-hp('18.5%')}
                left={wp('14%')}
              />
              <Text style={styles.textCont2}>Rohini/City , Delhi/State</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: -hp('13%'),
                left: wp('16%'),
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Edit')}>
                <Text style={styles.textCont3}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.imgCont2}>
            Electrify your Establishment today
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Host')}>
            <View>
              <BoxShadow setting={shadowOpt}>
                <Host
                  height={hp('8%')}
                  width={wp('80%')}
                  marginTop={wp('3%')}
                  marginLeft={-wp('5%')}
                />
              </BoxShadow>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginLeft: wp('8%'),
            marginTop: wp('2%'),

          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Work')}
            activeOpacity={0.5}>
            <View flexDirection="row">
              <Text style={styles.item1}>how veCharge works</Text>
              <Icon1
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('34%')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={share} activeOpacity={0.5}>
            <View flexDirection="row">
              <Text style={styles.item1}>Refer a friend</Text>
              <Icon2
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('46%')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Report')}
            activeOpacity={0.5}>
            <View flexDirection="row">
              <Text style={styles.item1}>Report an issue</Text>
              <Icon3
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('42')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Feed')}
            activeOpacity={0.5}>
            <View flexDirection="row">
              <Text style={styles.item1}>Give us feedback</Text>
              <Icon4
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('40%')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOverlay} activeOpacity={0.5}>
            <View flexDirection="row"
            >
              <Text style={styles.item1}>Rate us</Text>
              <Icon5
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('56%')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            activeOpacity={0.5}>
            <View flexDirection="row">
              <Text style={styles.item1}>About</Text>
              <Icon6
                height={hp('8%')}
                width={wp('5%')}
                marginTop={hp('0.2%')}
                marginLeft={wp('58%')}
              />
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: wp('8%'),
            height: hp('10%'),
            width: wp('30%'),
          }}>
          <TouchableOpacity onPress={() => sign()} activeOpacity={0.5}>
            <Logout height={hp('10%')} width={wp('30%')} />
          </TouchableOpacity>
        </View>
        <View flexDirection="row"
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: '#292929',
              fontSize: wp('3.6%'),
              marginLeft: wp('0.3%'),
              marginTop: wp('2%'),
            }}>
            Connect with us
          </Text>
          <TouchableOpacity
            onPress={twitter}
            style={{
              marginLeft: wp('4%'),
              marginTop: wp('3%'),
            }}
            activeOpacity={0.5}>
            <Twitter height={hp('4.2%')} width={wp('7%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={fb}
            style={{
              marginLeft: wp('4%'),
              marginTop: wp('2%'),
            }}
            activeOpacity={0.5}>
            <Facebook height={hp('3.6%')} width={wp('7%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={intsa}
            style={{
              marginLeft: wp('4%'),
              marginTop: wp('2%'),
            }}
            activeOpacity={0.5}>
            <Instagram height={hp('3.6%')} width={wp('7%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={linkedIn}
            style={{
              marginLeft: wp('4%'),
              marginTop: wp('2%'),
            }}
            activeOpacity={0.5}>
            <LinkedIn height={hp('3.6%')} width={wp('7%')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={website}
            style={{
              marginLeft: wp('4%'),
              marginTop: wp('2%'),
            }}
            activeOpacity={0.5}>
            <Web height={hp('3.6%')} width={wp('7%')} />
          </TouchableOpacity>

        </View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            top: hp('25%'),
            flex: 0.5,
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            backgroundColor: '#F6F6F6',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: wp('100%'), flex: 1, marginBottom: 50 }}>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 20,
                top: 5,
                padding: 10,
                fontFamily: 'SF-Pro-Display-Medium',
                color: 'black',
              }}>
              Rate your veCharge experience
            </Text>

            {/* <Rating
              type="custom"
              minValue={1}
              defaultValue={2}
              onFinishRating={ratingCompleted}
              style={{
                top: -5,
                // backgroundColor: 'yellow',
                padding: 10,
              }}
              ratingColor="#3498db"
              tintColor="#F6F6F6"
              ratingBackgroundColor="#D3D3D3"
            /> */}
            <Bar />

            <KeyboardAvoidingView
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={{
                  paddingLeft: 15,
                  textAlignVertical: 'top',
                  marginTop: 10,
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#525252',
                  flexWrap: 'wrap',
                  borderRadius: 20,
                }}
                numberOfLines={4}
                placeholder="Describe your experience(optional)"
              />
            </KeyboardAvoidingView>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={toggleplay}
                style={{
                  marginLeft: wp('70%'),
                  marginTop: hp('2%'),
                  backgroundColor: '#069DFF',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp('4%'),
                  borderRadius: 10,
                }}>
                {/* <Image
                  source={require('../assets/arrow.png')}
                  style={{
                    height: hp('5%'),
                    width: wp('5%'),
                    marginLeft: wp('80%'),
                    marginTop: hp('2%'),
                  }}
                /> */}
                <Text style={{ fontSize: 15, color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Overlay>
        {Platform.OS === 'android' ? (
          <Overlay
            isVisible={visble}
            onBackdropPress={close}
            // fullScreen={false}
            overlayStyle={{
              top: hp('25%'),
              flex: 0.5,
              borderTopLeftRadius: 45,
              borderTopRightRadius: 45,
              backgroundColor: '#F6F6F6',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: wp('100%'), flex: 1, marginBottom: 50 }}>
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 20,
                  top: 5,
                  padding: 10,
                  fontFamily: 'SF-Pro-Display-Medium',
                  color: 'black',
                }}>
                Rate your veCharge experience
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: '#252525',
                  marginLeft: wp('8%'),
                  fontSize: 20,
                  marginTop: hp('5%'),
                }}>
                Please rate us on the Playstore too :)
              </Text>
              <TouchableOpacity
                onPress={Open}
                style={{ marginTop: -wp('30%'), marginLeft: wp('10%') }}>
                <PlayStore height={hp('50%')} width={wp('50%')} />
              </TouchableOpacity>
            </ScrollView>
          </Overlay>
        ) : (
          <Overlay
            isVisible={visble}
            onBackdropPress={close}
            // fullScreen={false}
            overlayStyle={{
              top: 190,
              flex: 0.5,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              backgroundColor: '#F6F6F6',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: wp('100%'), flex: 1, marginBottom: 50 }}>
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 20,
                  top: 5,
                  padding: 10,
                  fontFamily: 'SF-Pro-Display-Medium',
                  color: 'black',
                }}>
                Rate your veCharge experience
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: '#252525',
                  marginLeft: wp('8%'),
                  fontSize: 20,
                  marginTop: hp('5%'),
                }}>
                Please rate us on the Playstore too :)
              </Text>
              <TouchableOpacity
                onPress={OpenIOS}
                style={{ marginTop: -wp('30%'), marginLeft: wp('10%') }}>
                <AppStore height={hp('50%')} width={wp('50%')} />
              </TouchableOpacity>
            </ScrollView>
          </Overlay>
        )}
      </ScrollView>
      {paid === false ? (
        <UnpaidNotify
          amount={amount}
          onPress={() => onPay().finally(() => navigation.replace('PayDetail'))}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  textCont: {
    fontSize: wp('8%'),
    color: 'white',
    marginTop: hp('4%'),
    marginLeft: hp('8%'),
    position: 'absolute',
    fontFamily: 'SF-Pro-Text-Bold',
  },

  textCont2: {
    color: 'white',
    fontSize: wp('3%'),
    position: 'absolute',
    top: -hp('17%'),
    left: wp('20%'),

    fontFamily: 'SF-Pro-Text-Semibold',
  },
  textCont3: {
    fontSize: wp('3.3%'),
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  imgCont2: {
    fontSize: wp('4%'),
    color: '#292929',
    marginTop: -wp('12%'),
    marginLeft: wp('8%'),
    fontFamily: 'SF-Pro-Text-Medium',
  },
  imgCont3: {
    height: hp('8%'),
    width: wp('80%'),
    marginLeft: wp('4%'),
  },
  item1: {
    fontFamily: 'SF-Pro-Text-Regular',
    color: '#292929',
    marginTop: hp('2.5%'),
    fontSize: wp('3.4%'),
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: wp('80%'),
    marginTop: -hp('2.5%'),
  },
  icon: {
    height: hp('4%'),
    width: wp('7%'),
    marginLeft: wp('4%'),
    marginTop: wp('2%'),
  },
  customRatingStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
});

export default Profile;
