import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {RazorpayApiKey} from '../Constants/config';

import RadioButton from '../components/RadioButton';

const PROP = [
  {
    key: '1',
    text: 'Paytm',
  },
  {
    key: '2',
    text: 'Google Pay',
  },
  {
    key: '3',
    text: 'Net Banking',
  },
  {
    key: '4',
    text: 'Card',
  },
];

export default function Payment({navigation}) {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [amount, setAmount] = useState([]);
  const [energy, setEnergy] = useState([]);

  const unpaid = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const order = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/unpaid`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
  };
  useEffect(() => {
    unpaid();
  }, []);

  // const createOrder = async () => {
  //   var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const order = await fetch(
  //     `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/instantiatePayment`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //     },
  //   );
  //   const orderData = await order.json();
  // };

  // const verifyPayment = async (orderID, transaction) => {
  //   var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const verify = await fetch(
  //     `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({
  //         orderID: orderID,
  //         transaction: transaction,
  //       }),
  //     },
  //   );
  //   const verifyData = await verify.json();

  //   console.log('verify Paymnet details', verifyData);
  // };

  const onPay = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const order = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/instantiatePayment`,
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

    console.log('OnPay');

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
        console.log(data);
        const result = await axios
          .post(
            'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment',
            data,
            config,
          )
          .then(console.log)
          .catch(console.log);
      })
      .catch(console.log);
  };

  return (
    <SafeAreaView style={styles.cont}>
      <View>
        <ImageBackground
          source={require('../assets/details.png')}
          style={{width: wp('100%'), height: hp('16%')}}
          resizeMode="cover">
          <Image
            source={require('../assets/Back.png')}
            style={{
              width: wp('5%'),
              height: hp('3%'),
              marginLeft: wp('4%'),
              marginTop: wp('2%'),
            }}
          />
        </ImageBackground>
      </View>

      <View flexDirection="row">
        <View style={styles.box1} flexDirection="column">
          <View flexDirection="row">
            <Image
              source={require('../assets/energy-icon.png')}
              style={{
                height: hp('5%'),
                width: wp('10%'),
                margin: wp('3%'),
                borderRadius: wp('10%') / 8,
              }}
            />
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: wp('5%'),
                  marginTop: wp('2%'),
                }}>
                Energy
              </Text>
              <Text style={{fontSize: wp('3.5%'), color: 'white'}}>
                consumed
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: wp('9%'),
                color: 'white',
                fontWeight: 'bold',
                padding: wp('1%'),
                marginTop: wp('4%'),
              }}>
              23 kWh
            </Text>
          </View>
        </View>
        <View style={styles.box2} flexDirection="column">
          <View flexDirection="row">
            <Image
              source={require('../assets/cost.png')}
              style={{
                height: hp('5%'),
                width: wp('10%'),
                margin: wp('3%'),
                borderRadius: wp('10%') / 8,
              }}
            />
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: wp('5%'),
                  marginTop: wp('2%'),
                }}>
                Amount
              </Text>
              <Text style={{fontSize: wp('3.5%'), color: 'white'}}>
                Payable
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: wp('9%'),
                color: 'white',
                fontWeight: 'bold',
                padding: wp('1%'),
                marginTop: wp('4%'),
                marginLeft: wp('2%'),
              }}>
              20 INR
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            marginLeft: wp('5%'),
            marginTop: wp('3%'),
            fontWeight: 'bold',
            color: '#3D3D3D',
            fontSize: wp('7%'),
          }}>
          Complete Payment
        </Text>
        <View style={styles.container}>
          <RadioButton PROP={PROP} />
        </View>
      </View>
      <View
        flexDirection="row"
        style={{
          alignItems: 'center',
          marginTop: wp('30%'),
          borderRadius: 8,
          borderWidth: 0.3,
          height: hp('11%'),
        }}>
        <View flexDirection="column">
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: wp('5%'),
              fontSize: wp('8%'),
              color: 'black',
            }}>
            {'\u20B9'} 48
          </Text>
          <Image
            source={require('../assets/view.png')}
            style={{
              height: hp('1.3%'),
              width: wp('25%'),
              marginLeft: wp('3%'),
            }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => onPay().then(() => navigation.replace('AppBottom'))}>
          <Image
            source={require('../assets/payNow.png')}
            style={{
              height: hp('6%'),
              width: wp('60%'),
              marginLeft: wp('7%'),
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  box1: {
    backgroundColor: '#03AD70',
    height: hp('19%'),
    width: wp('40%'),
    borderRadius: hp('20%') / 8,
    margin: wp('5%'),
    padding: 5,
    marginTop: hp('5%'),
  },
  box2: {
    backgroundColor: '#2D9CDB',
    height: hp('19%'),
    width: wp('40%'),
    borderRadius: hp('20%') / 8,
    margin: wp('5%'),
    padding: 5,
    marginTop: hp('5%'),
  },
});
