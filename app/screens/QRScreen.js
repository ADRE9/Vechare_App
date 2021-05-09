import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RazorpayCheckout from 'react-native-razorpay';

import Unpaid from '../components/Unpaid';
import {RazorpayApiKey} from '../Constants/config';

export default function QRScreen({navigation}) {
  const [opneScanner, setOpneScanner] = useState(false);
  const [connect, setConnect] = useState([]);
  const [idvalue, setIdvalue] = useState([]);
  const [paid, setPaid] = useState([]);
  const [amount, setAmount] = useState([]);

  const onBarcodeScan = async (e) => {
    // Called after te successful scanning of QRCode/Barcode
    console.log(e.data);
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const chargerID = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/check/${e.data}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );

    const charger = await chargerID.json();

    if (charger.status === 'success') {
      async function value() {
        try {
          await AsyncStorage.setItem('id', e.data);
          await AsyncStorage.setItem('idValue', e.data);
        } catch (e) {
          console.log('error in token storing', e);
        }
      }
      value().then(() => navigation.replace('Status'));
    } else {
      return ToastAndroid.showWithGravityAndOffset(
        'Invalid Charger ID',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
    }
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
      console.log('unpaid SCreen');
      const result = await axios.post(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment',
        data,
        config,
      );
    });
  };
  useEffect(() => {
    async function connection() {
      var token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const value = await AsyncStorage.getItem('id');
      const res = await fetch(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/users/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const resData = await res.json();
      setConnect(value);

      setIdvalue(resData.data.connectedCharger[0]._id);
    }
    connection();
  }, []);

  useEffect(() => {
    async function unpaid() {
      var token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        'http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/unpaid',
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
    }
    unpaid();
  }, []);

  if (idvalue === connect) {
    return <View>{navigation.replace('Status')}</View>;
  } else if (paid === false) {
    return (
      <Unpaid
        amount={amount}
        onPress={() => onPay().finally(() => navigation.replace('AppBottom'))}
      />
    );
  } else {
    return (
      <QRCodeScanner
        onRead={onBarcodeScan}
        containerStyle={{
          backgroundColor: 'white',
          flex: 1,
        }}
        cameraStyle={[{height: 350, width: 400, marginTop: -85}]}
        markerStyle={{
          borderColor: '#626262',
          borderRadius: 30,
          marginRight: wp('2%'),
        }}
        //   flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        permissionDialogMessage="Need Permission to access Camera"
        reactivateTimeout={1000}
        showMarker={true}
        bottomContent={
          <View>
            <Text style={styles.charge}>Charge via Station ID</Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 25,
              }}>
              Enter code here
            </Text>
            <TextInput style={styles.input} placeholder="   Enter station" />
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => navigation.replace('Status')}>
              <Text style={styles.buttonText}>Next ➡ </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    width: 300,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
  input: {
    marginTop: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    marginRight: 30,
    borderRadius: 30,
    padding: 5,
    // paddingLeft: 10,
    backgroundColor: '#e7e7e7',
    color: 'black',
    width: 280,
  },
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  pay: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: wp('5%'),
    height: hp('5%'),
    width: wp('40%'),
    padding: 6,
    borderRadius: wp('8%') / 4,
    backgroundColor: '#069DFF',
    marginTop: wp('3%'),
  },
  charge: {
    marginTop: 30,
    fontSize: 23,
    fontWeight: 'bold',
    width: '80%',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
