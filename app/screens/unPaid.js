import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
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
import '../Constants/Useragent';

export default function UnPaid({navigation}) {
  // const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function value() {
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const id = await AsyncStorage.getItem('id');

      const socket = io.connect(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com',
        {
          query: {
            chargerId: id,
            token: token,
          },
        },
      );
    }
    value();
  });

  const disconnect = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    var id = await AsyncStorage.getItem('id');
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

  const onPay = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
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

    // console.log('OnPay');

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
      theme: {color: '#a29bfe'},
    };
    RazorpayCheckout.open(options).then(async function (response) {
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
      const result = await axios.post(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment',
        data,
        config,
      );
    });
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

      <View>
        <Text style={styles.completePayment}>Complete Due Payment</Text>
      </View>
      <View flexDirection="row" style={styles.paymentContainer}>
        <View flexDirection="column">
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
          onPress={() =>
            disconnect()
              .then(() => onPay())
              .finally(() => navigation.replace('AppBottom'))
          }>
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
    marginTop: wp('90%'),
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
