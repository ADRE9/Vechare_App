import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {RazorpayApiKey} from '../Constants/config';

export default function Payment() {
  const [product, setProduct] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // const onComponentMount = async () => {
  //   const {data} = await axios.get(
  //     `https://fakestoreapi.com/products/${Math.floor(Math.random() * 20)}`,
  //   );
  //   data.price = data.price * 100;
  //   setProduct(data);
  // };

  // useEffect(() => {
  //   onComponentMount();
  // }, []);

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
    const resData = await order.json();
  };

  const createOrder = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const order = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/instantiatePayment`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
  };

  const verifyPayment = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const verify = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/madePayment`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
  };

  const onPay = async () => {
    console.log('OnPay');
    setPaymentProcessing(true);
    const order = await createOrder();
    var options = {
      name: product.title,
      image: product.image,
      description: product.description,
      order_id: order.id,
      key: RazorpayApiKey,
      prefill: {
        email: 'useremail@example.com',
        contact: '9191919191',
        name: 'John Doe',
      },
      theme: {color: '#a29bfe'},
    };
    RazorpayCheckout.open(options)
      .then(async (transaction) => {
        const validSignature = await verifyPayment(order.id, transaction);
        alert('Is Valid Payment: ' + validSignature);
      })
      .catch(console.log);
    setPaymentProcessing(false);
  };

  if (!product) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color="#a29bfe" size={60} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={onPay}>
        {paymentProcessing ? (
          <ActivityIndicator color="white" size={30} />
        ) : (
          <Text style={styles.buttonText}>Pay </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: 50,
    fontSize: 28,
    color: '#a29bfe',
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 50,
    borderRadius: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 22,
    textAlign: 'center',
    width: '80%',
    color: '#a29bfe',
  },
  description: {
    width: '80%',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#a29bfe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
