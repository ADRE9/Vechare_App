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
import {Cost, EnergyConsumed, Time, ChargeHeader, PayBtn} from 'svg';
import {BoxShadow} from 'react-native-shadow';

import moment from 'moment';

import {RazorpayApiKey} from '../Constants/config';

import '../Constants/Useragent';
import CustomBack from '../components/CustomBack';

export default function Payment({navigation}) {
  // const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState([]);
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

  function DateCh({tm}) {
    let th1 = moment(tm).utcOffset('+05:30').format('h');
    let tm1 = moment(tm).utcOffset('+05:30').format('mm');
    let th2 = moment().utcOffset('+05:30').format('h');
    let tm2 = moment().utcOffset('+05:30').format('mm');
    let hr = th2 - th1 + ' ' + 'hr' + ' ' + (tm2 - tm1) + 'min';

    return hr;
  }
  // useEffect(() => {
  //   async function value() {
  //     const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const id = await AsyncStorage.getItem('id');

  //     const socket = io.connect(
  //       'https://vecharge.app/api/v1',
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
  //     `https://vecharge.app/api/v1/charger/removeChargerFromUser/${id}`,
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
  //       'https://vecharge.app/api/v1/payment/instantiatePayment',
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

  const shadowOpt = {
    width: wp('100%'),
    height: hp('60%'),
    color: '#000000',
    border: 10,
    // radius: 6,
    opacity: 0.2,
    // x: 1,
    y: 140,
  };

  const onPay = async () => {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    // const order = await fetch(
    //   'https://vecharge.app/api/v1/payment/instantiatePayment',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: token,
    //     },
    //   },
    // );
    // const orderData = await order.json();
    // console.log('order data of payment', orderData);

    // if (orderData.status === 'fail') {
    //   return navigation.replace('Pay');
    // }

    const pyt = await AsyncStorage.getItem('pyt');
    const pytId = await AsyncStorage.getItem('pytId');
    const mail = await AsyncStorage.getItem('mail');
    const name = await AsyncStorage.getItem('name');
    const number = await AsyncStorage.getItem('number');

    var options = {
      description: 'Electricity bill payment',
      curreny: 'INR',
      amount: pyt,
      order_id: pytId,
      key: RazorpayApiKey,
      prefill: {
        email: mail,
        contact: number,
        name: name,
      },
      theme: {color: '#a29bfe'},
    };

    RazorpayCheckout.open(options)
      .then(async function (response) {
        const config = {
          headers: {Authorization: token},
        };
        const data = {
          orderCreationId: pytId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // console.log(data);
        console.log('payment screen');
        const result = await axios.post(
          'https://vecharge.app/api/v1/payment/madePayment',
          data,
          config,
        );
      })
      .finally(() => navigation.replace('PayDetail'))
      .catch((err) => {
        navigation.replace('AppBottom', {err});
      });
  };

  return (
    <SafeAreaView style={styles.cont}>
      <ImageBackground
        source={require('../assets/chargeFinal.png')}
        style={{
          height: 120,
          width: wp('100%'),
        }}>
        <Text style={styles.header}>Charging Details</Text>
      </ImageBackground>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <LinearGradient colors={['#4B5358', '#545B60']} style={styles.box3}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Time
              height={hp('6%')}
              width={wp('15%')}
              borderRadius={wp('10%') / 8}
            />
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Medium',
                  color: 'white',
                  fontSize: 20,
                }}>
                Time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'SF-Pro-Display-Regular',
                  color: 'white',
                }}>
                Charged
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontFamily: 'SF-Pro-Display-Semibold',
              paddingHorizontal: 10,
            }}>
            <DateCh tm={time}></DateCh>
          </Text>
        </LinearGradient>

        <LinearGradient colors={['#03AD70', '#059863']} style={styles.box1}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <EnergyConsumed height={hp('6%')} width={wp('15%')} />
            <View style={{marginRight: wp('4%')}}>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Medium',
                  color: 'white',
                  fontSize: 20,
                }}>
                Energy
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  fontSize: 14,
                  color: 'white',
                }}>
                Consumed
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontFamily: 'SF-Pro-Display-Semibold',
              paddingHorizontal: 10,
            }}>
            {energy} kWh
          </Text>
        </LinearGradient>

        <LinearGradient colors={['#2D9CDB', '#2C93CE']} style={styles.box2}>
          <View flexDirection="row">
            <Cost height={hp('6%')} width={wp('15%')} />
            <View>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Medium',
                  color: 'white',
                  fontSize: 20,
                }}>
                Amount
              </Text>
              <Text
                style={{
                  fontFamily: 'SF-Pro-Display-Regular',
                  fontSize: 14,
                  color: 'white',
                }}>
                Payable
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
                paddingHorizontal: 10,
              }}>
              {'\u20B9'} {amount}
            </Text>
          </View>
        </LinearGradient>
      </View>
      {/* <BoxShadow setting={shadowOpt}> */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 90,
            shadowColor: 'black',
            elevation: 20,
            borderWidth: 0.18,
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              fontFamily: 'SF-Pro-Display-Semibold',
              fontSize: 22,
              marginTop: wp('1%'),
              color: 'black',
              marginRight: 80,
            }}>
            {'\u20B9'} {amount}
          </Text>

          <TouchableOpacity onPress={() => onPay()}>
            <PayBtn width={185} />
          </TouchableOpacity>
        </View>
      </View>

      {/* </BoxShadow> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 28,
    marginLeft: 60,
    marginTop: 25,
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
    height: hp('13%'),
    width: wp('74%'),
    borderRadius: hp('20%') / 16,
    padding: 3,
    marginTop: hp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box2: {
    // backgroundColor: "#2D9CDB",
    height: hp('13%'),
    width: wp('74%'),
    borderRadius: hp('20%') / 16,
    padding: 3,
    marginTop: hp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  box3: {
    // backgroundColor: "#4B5358",
    height: hp('13%'),
    width: wp('74%'),
    borderRadius: hp('20%') / 16,
    padding: 3,
    marginTop: hp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
