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

import '../Constants/Useragent';

export default function Payment({navigation}) {
  // const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState([]);
  const [amnt, setAmnt] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [time, setTime] = useState([]);

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
      socket.on('chargerConnected', (data) => {
        data = JSON.parse(data);
        setAmount(
          (data.price * data.energy + data.price * data.energy * 0.15).toFixed(
            2,
          ),
        );
        setAmnt(data.price * data.energy);
        setEnergy(data.energy);
      });
      try {
        await AsyncStorage.setItem('amount', amount);
        await AsyncStorage.setItem('amnt', amnt);
      } catch (e) {
        console.log(e);
      }
      try {
        const jsonValue = JSON.stringify(energy);
        await AsyncStorage.setItem('energy', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    value();
  });

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
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const id = await AsyncStorage.getItem('id');
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
    <SafeAreaView style={styles.cont}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/chargeHeader.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <View flexDirection="row">
              {/* <TouchableOpacity onPress={() => navigation.replace('AppBottom')}>
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
          <View style={styles.box3} flexDirection="row">
            <View flexDirection="row" style={{marginRight: wp('4%')}}>
              <Image
                source={require('../assets/time.png')}
                style={{
                  height: hp('5%'),
                  width: wp('10%'),
                  margin: wp('3%'),
                  borderRadius: wp('10%') / 8,
                }}
              />
              <View>
                <Text style={styles.timeContainer}>Time</Text>
                <Text style={{fontSize: wp('3.4%'), color: 'white'}}>
                  Changed
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.time}>2h 35min</Text>
            </View>
          </View>

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
              <View style={{marginRight: wp('4%')}}>
                <Text style={styles.energyContainer}>Energy</Text>
                <Text style={{fontSize: wp('3.4%'), color: 'white'}}>
                  Consumed
                </Text>
              </View>
              <View>
                <Text style={styles.energy}>{energy} kWh</Text>
              </View>
            </View>
          </View>

          <View style={styles.box2} flexDirection="row">
            <View flexDirection="row" style={{marginRight: wp('4%')}}>
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
                <Text style={styles.AmtContainer}>Amount</Text>
                <Text style={{fontSize: wp('3.4%'), color: 'white'}}>
                  Payable
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.Amount}>
                {'\u20B9'} {amount}
              </Text>
            </View>
          </View>
        </View>

        <View flexDirection="row" style={styles.amountContainer}>
          <Text style={styles.amount}>
            {'\u20B9'} {amount}
          </Text>

          <TouchableOpacity
            onPress={() =>
              disconnect()
                .then(() => onPay())
                .finally(() => navigation.replace('PayDone'))
            }>
            <Image
              source={require('../assets/payNow.png')}
              style={{
                height: hp('6%'),
                width: wp('50%'),
                marginLeft: wp('12%'),
                marginTop: wp('3%'),
                borderRadius: wp('8%') / 4,
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
    backgroundColor: 'white',
  },
  txt: {
    color: 'white',
    fontSize: wp('8%'),
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: wp('8%'),
    marginTop: wp('7%'),
  },
  box1: {
    backgroundColor: '#03AD70',
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('10%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    backgroundColor: '#2D9CDB',
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('10%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    backgroundColor: '#4B5358',
    height: hp('16%'),
    width: wp('70%'),
    borderRadius: hp('20%') / 8,
    marginLeft: wp('10%'),
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontWeight: 'bold',
    marginLeft: wp('5%'),
    fontSize: wp('6%'),
    marginTop: wp('2%'),
    color: 'black',
  },
  amountContainer: {
    alignItems: 'center',
    marginTop: wp('26%'),
    borderRadius: 8,
    borderWidth: 0.3,
    height: hp('10%'),
  },
  Amount: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
    padding: wp('1%'),
    marginTop: wp('4%'),
    marginLeft: wp('2%'),
  },
  AmtContainer: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: wp('5.2%'),
    marginTop: wp('2%'),
  },
  energy: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
    padding: wp('1%'),
    marginTop: wp('4%'),
  },
  energyContainer: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: wp('5.2%'),
    marginTop: wp('2%'),
  },
  time: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
    padding: wp('1%'),
    marginTop: wp('4%'),
    marginLeft: wp('2%'),
  },
  timeContainer: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: wp('5.2%'),
    marginTop: wp('2%'),
  },
});
