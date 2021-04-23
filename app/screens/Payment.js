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
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import io from 'socket.io-client';

import {RazorpayApiKey} from '../Constants/config';

import RadioButton from '../components/RadioButton';
import '../Constants/Useragent';

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
  // const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState([]);
  const [energy, setEnergy] = useState([]);

  useEffect(() => {
    async function value() {
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const id = await AsyncStorage.getItem('id');

      console.log(id);
      console.log(token);
      const socket = io.connect(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com',
        {
          query: {
            chargerId: id,
            token: token,
          },
        },
      );
      socket.on('chargerConnected', (data) => {
        data = JSON.parse(data);
        console.log(data);
        setAmount((data.price * data.energy).toFixed(2));
        setEnergy(data.energy);
      });
    }
    value();
  }, []);




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

  const disconnect = async () => {
    const token = `Bearer ${await AsyncStorage.getItem("token")}`;
    const id = await AsyncStorage.getItem("id");
    await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/removeChargerFromUser/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('id');
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };

  const onPay = async () => {
    const token = `Bearer ${await AsyncStorage.getItem("token")}`;
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
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/details.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <TouchableOpacity onPress={() => navigation.replace('Status')}>
              <Image
                source={require('../assets/Back.png')}
                style={{
                  width: wp('5%'),
                  height: hp('3%'),
                  marginLeft: wp('4%'),
                  marginTop: wp('2%'),
                }}
              />
            </TouchableOpacity>
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
              <Text style={styles.energy}>{energy} kWh</Text>
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
              <Text style={styles.amount}>{amount} INR</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.completePayment}>Complete Payment</Text>
          <View style={styles.container}>
            <RadioButton PROP={PROP} />
          </View>
        </View>
        <View flexDirection="row" style={styles.paymentContainer}>
          <View flexDirection="column">
            <Text style={styles.payment}>
              {'\u20B9'} {amount}
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
          <TouchableOpacity onPress={() =>
            disconnect()
            .then(() => onPay().then(() => navigation.replace('AppBottom')))
            .then(() => clearStorage())}>
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
      </ScrollView>
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
  energy: {
    fontSize: wp('7%'),
    color: 'white',
    fontWeight: 'bold',
    padding: wp('1%'),
    marginTop: wp('4%'),
  },
  amount: {
    fontSize: wp('7%'),
    color: 'white',
    fontWeight: 'bold',
    padding: wp('1%'),
    marginTop: wp('4%'),
    marginLeft: wp('2%'),
  },
  completePayment: {
    marginLeft: wp('5%'),
    marginTop: wp('3%'),
    fontWeight: 'bold',
    color: '#3D3D3D',
    fontSize: wp('7%'),
  },
  paymentContainer: {
    alignItems: 'center',
    marginTop: wp('30%'),
    borderRadius: 8,
    borderWidth: 0.3,
    height: hp('11%'),
  },
  payment: {
    fontWeight: 'bold',
    marginLeft: wp('5%'),
    fontSize: wp('8%'),
    color: 'black',
  },
});
