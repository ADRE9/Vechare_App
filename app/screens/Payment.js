import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {RazorpayApiKey} from '../Constants/config';

import '../Constants/Useragent';

export default function Payment({navigation}) {
  // const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState([]);
  const [price, setPrice] = useState([]);
  const [id, setId] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [time, setTime] = useState('');
  const [currentHour, setCurrenthour] = useState('');
  const [currentMin, setCurrentMin] = useState('');

  useEffect(() => {
    async function data() {
      const am = await AsyncStorage.getItem('amount');
      const en = await AsyncStorage.getItem('energy');
      const tm = await AsyncStorage.getItem('time');
      setAmount(am);
      setEnergy(en);
      setTime(tm);
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      setCurrenthour(hours);
      setCurrentMin(min);
      console.log('time from status screen', tm);
    }
    data();
  }, []);

  const chargeHours = new Date(time).getHours();
  const chargeMinutes = new Date(time).getMinutes();
  console.log(
    'charge hour + charge minutes',
    chargeHours + ' ' + chargeMinutes,
  );
  // useEffect(() => {
  //   async function value() {
  //     const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const id = await AsyncStorage.getItem('id');

  //     const socket = io.connect(
  //       'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com',
  //       {
  //         query: {
  //           chargerId: id,
  //           token: token,
  //         },
  //       },
  //     );
  //     socket.on('chargerConnected', (data) => {
  //       data = JSON.parse(data);
  //       setAmount(
  //         (data.price * data.energy + data.price * data.energy * 0.15).toFixed(
  //           2,
  //         ),
  //       );
  //       setAmnt(data.price * data.energy);
  //       setEnergy(data.energy);
  //     });
  //     try {
  //       await AsyncStorage.setItem('amount', amount);
  //       await AsyncStorage.setItem('amnt', amnt);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     try {
  //       const jsonValue = JSON.stringify(energy);
  //       await AsyncStorage.setItem('energy', jsonValue);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   value();
  // });

  // const pay = () => {
  //   Alert.alert('Payment', 'Do you wish to Disconnect Charger?, Pay Now', [
  //     {
  //       text: 'Yes',
  //       onPress: () =>
  //         disconnect()
  //           .then(() => onPay().then(() => navigation.replace('AppBottom')))
  //           .then(() => clearStorage()),
  //     },
  //     {
  //       text: 'Go back',
  //       onPress: () => navigation.replace('AppBottom'),
  //     },
  //   ]);
  // };

  // const disconnect = async () => {
  //   const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const id = await AsyncStorage.getItem('id');
  //   await fetch(
  //     `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/removeChargerFromUser/${id}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //     },
  //   );
  // };

  // useEffect(() => {
  //   async function payment() {
  //     const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const order = await fetch(
  //       'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/instantiatePayment',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     const orderData = await order.json();
  //     console.log(orderData);
  //     setPrice(orderData.amount);
  //     setId(orderData.id);
  //     console.log('OnPay');
  //   }
  //   payment();
  // }, []);

  const onPay = async () => {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const order = await fetch(
      'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/instantiatePayment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    const orderData = await order.json();
    console.log(orderData);

    var options = {
      description: 'Electricity bill payment',
      curreny: 'INR',
      amount: orderData.amount,
      order_id: orderData.id,
      key: RazorpayApiKey,
      prefill: {
        email: 'useremail@example.com',
        contact: '9191919191',
        name: 'John Doe',
      },
      theme: {color: '#a29bfe'},
    };
    RazorpayCheckout.open(options)
      .then(async function (response) {
        const config = {
          headers: {Authorization: token},
        };
        const data = {
          orderCreationId: orderData.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // console.log(data);
        console.log('payment screen');
        const result = await axios.post(
          'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment',
          data,
          config,
        );
      })
      .catch((err) => {
        navigation.replace('AppBottom', {err});
      });
  };

  return (
    <ScrollView style={styles.cont}>
      <SafeAreaView style={styles.cont}>
        <View>
          <ImageBackground
            source={require('../assets/chargeHeader.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <View flexDirection="row">
              {/* <TouchableOpacity onPress={() => console.log('btn ')}>
                <Image
                  source={require('../assets/Back.png')}
                  style={{
                    width: wp('7%'),
                    height: hp('4%'),
                    marginLeft: wp('6%'),
                    marginTop: wp('8%'),
                  }}
                />
              </TouchableOpacity> */}
              <Text style={styles.txt}>Charging Details</Text>
            </View>
          </ImageBackground>
        </View>

        <View flexDirection="column">
          <LinearGradient colors={['#4B5358', '#545B60']} style={styles.box3}>
            <View flexDirection="row">
              <View flexDirection="row" style={{marginRight: wp('4%')}}>
                <Image
                  source={require('../assets/time.png')}
                  style={{
                    height: hp('6%'),
                    width: wp('11%'),
                    margin: wp('3%'),
                    borderRadius: wp('10%') / 8,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Display-Medium',
                      color: 'white',
                      fontSize: wp('5.2%'),
                      marginTop: wp('2%'),
                    }}>
                    Time
                  </Text>
                  <Text
                    style={{
                      fontSize: wp('3.4%'),
                      fontFamily: 'SF-Pro-Display-Regular',
                      color: 'white',
                    }}>
                    Charged
                  </Text>
                </View>
              </View>
              <View style={{marginRight: wp('2%')}}>
                <Text
                  style={{
                    fontSize: wp('6%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    padding: wp('1%'),
                    marginTop: wp('5%'),
                    marginLeft: wp('6%'),
                  }}>
                  {currentHour - chargeHours}h {currentMin - chargeMinutes}min
                </Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#03AD70', '#059863']} style={styles.box1}>
            <View flexDirection="column">
              <View flexDirection="row">
                <Image
                  source={require('../assets/energy-icon.png')}
                  style={{
                    height: hp('6%'),
                    width: wp('11%'),
                    margin: wp('3%'),
                    borderRadius: wp('10%') / 8,
                  }}
                />
                <View style={{marginRight: wp('4%')}}>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Display-Medium',
                      color: 'white',
                      fontSize: wp('5.2%'),
                      marginTop: wp('2%'),
                    }}>
                    Energy
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Display-Regular',
                      fontSize: wp('3.4%'),
                      color: 'white',
                    }}>
                    Consumed
                  </Text>
                </View>
                <View style={{marginRight: wp('2%')}}>
                  <Text
                    style={{
                      fontSize: wp('6%'),
                      color: 'white',
                      fontFamily: 'SF-Pro-Display-Semibold',
                      padding: wp('1%'),
                      marginTop: wp('5%'),
                      marginLeft: wp('6%'),
                    }}>
                    {energy} kWh
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#2D9CDB', '#2C93CE']} style={styles.box2}>
            <View flexDirection="row">
              <View flexDirection="row" style={{marginRight: wp('4%')}}>
                <Image
                  source={require('../assets/cost.png')}
                  style={{
                    height: hp('6%'),
                    width: wp('11%'),
                    margin: wp('3%'),
                    borderRadius: wp('10%') / 8,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Display-Medium',
                      color: 'white',
                      fontSize: wp('5.2%'),
                      marginTop: wp('2%'),
                    }}>
                    Amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'SF-Pro-Display-Regular',
                      fontSize: wp('3.4%'),
                      color: 'white',
                    }}>
                    Payable
                  </Text>
                </View>
              </View>
              <View style={{marginRight: wp('2%')}}>
                <Text
                  style={{
                    fontSize: wp('6%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    padding: wp('1%'),
                    marginTop: wp('5%'),
                    marginLeft: wp('5%'),
                  }}>
                  {'\u20B9'} {amount}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View flexDirection="row" style={styles.amount}>
          <Text
            style={{
              fontFamily: 'SF-Pro-Display-Semibold',
              marginLeft: wp('5%'),
              fontSize: wp('6%'),
              marginTop: wp('2%'),
              color: 'black',
            }}>
            {'\u20B9'} {amount}
          </Text>

          <TouchableOpacity
            onPress={() => onPay().then(() => navigation.replace('PayDone'))}>
            <Image
              source={require('../assets/payNow.png')}
              style={{
                height: hp('4.6%'),
                width: wp('50%'),
                marginLeft: wp('12%'),
                marginTop: wp('5%'),
                borderRadius: wp('8%') / 4,
                marginBottom: wp('3%'),
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  txt: {
    color: 'white',
    fontSize: wp('8%'),
    fontFamily: 'SF-Pro-Text-Bold',
    marginLeft: wp('5%'),
    marginTop: wp('7%'),
  },
  box1: {
    // backgroundColor: "#03AD70",
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('15%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    // backgroundColor: "#2D9CDB",
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('15%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    // backgroundColor: "#4B5358",
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('15%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 3,
    height: hp('10%'),
    marginTop: wp('14.8%'),
  },
});
