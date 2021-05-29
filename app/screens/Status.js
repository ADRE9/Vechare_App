/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  Switch,
  Button,
  ToastAndroid,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Cost, EnergyConsumed, Time, ChargeHeader, PayBtn } from 'svg';

import loader from '../components/loader';
import moment from 'moment';
import '../Constants/Useragent';

function Date({ tm }) {
  let th1 = moment(tm).utcOffset('+05:30').format('h');
  let tm1 = moment(tm).utcOffset('+05:30').format('mm');
  let th2 = moment().utcOffset('+05:30').format('h');
  let tm2 = moment().utcOffset('+05:30').format('mm');
  let hr = th2 - th1 + ' ' + 'hr' + ' ' + (tm2 - tm1) + 'min';

  return hr;
}

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      loaded: false,
      status: false,
      voltage: '',
      current: '',
      power: '',
      energy: '',
      price: '',
      time: [],
      error: '',
    };
  }
  disconnect = async () => {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const id = await AsyncStorage.getItem('id');
    const res = await fetch(
      `https://vecharge.app/api/v1/charger/removeChargerFromUser/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    const resData = await res.json();
    if (resData.status === 'success') {
      this.setState({ toggle: false });
    }
    const order = await fetch(
      'https://vecharge.app/api/v1/payment/instantiatePayment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    const orderData = await order.json();
    console.log('order data of payment', orderData);
    const jV = JSON.stringify(orderData.amount);
    await AsyncStorage.setItem('pyt', jV);
    await AsyncStorage.setItem('pytId', orderData.id);
  };

  // switchoff = async () => {
  //   const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const id = await AsyncStorage.getItem('id');

  //   fetch(
  //     'https://vecharge.app/api/v1/charger/chargerDesiredState',
  //     {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({
  //         status: this.state.toggle === false ? 'ON' : 'OFF',
  //         chargerId: id,
  //       }),
  //     },
  //   );
  // };

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'amount',
        (
          this.state.energy * this.state.price +
          this.state.energy * this.state.price * 0.15
        ).toFixed(2),
      );
      await AsyncStorage.setItem(
        'amnt',
        (this.state.energy * this.state.price).toFixed(2),
      );
      await AsyncStorage.setItem('energy', this.state.energy);
      await AsyncStorage.setItem('time', this.state.time);
      await AsyncStorage.removeItem('id');
      console.log('store data of status screen');
    } catch (e) {
      console.log(e);
    }
  };

  toggleSwitch = async () => {
    if (this.state.toggle === false) {
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const id = await AsyncStorage.getItem('id');

      fetch('https://vecharge.app/api/v1/charger/chargerDesiredState', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          status: this.state.toggle === false ? 'ON' : 'OFF',
          chargerId: id,
        }),
      });
    } else {
      Alert.alert(
        'Connection',

        'Do you wish to stop charging ?',
        [
          {
            text: 'Generate Bill',
            onPress: () =>
              this.disconnect()
                .then(() => this.storeData())
                .finally(() => this.props.navigation.navigate('Charging')),
          },

          // {
          //   text: 'Generate Bill',
          //   onPress: () =>
          //     this.switchoff().then(() =>
          //       this.props.navigation.replace('Charging'),
          //     ),
          //   style: 'cancel',
          // },
          {
            text: 'No',
            onPress: () => console.log('No'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
        //clicking out side of alert will not cancel
      );
    }
  };

  // message = () => {
  //   return ToastAndroid.showWithGravityAndOffset(
  //     'Device Connected',
  //     ToastAndroid.LONG,
  //     ToastAndroid.CENTER,
  //     25,
  //     50,
  //   );
  // };

  async componentDidMount() {
    console.log('Status screen');
    loader.load((v) => this.setState({ loaded: true }));

    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const id = await AsyncStorage.getItem('id');
    console.log(id);
    console.log(token);
    const socket = io.connect('https://vecharge.app', {
      query: {
        chargerId: id,
        token: token,
      },
    });

    socket.on('chargerConnected', (data) => {
      data = JSON.parse(data);
      console.log(data);
      if (data.status === 'OFF') {
        this.setState({ toggle: false });
      } else {
        this.setState({ toggle: true });
      }
      this.setState({ energy: data.energy });
      this.setState({ voltage: data.voltage });
      this.setState({ power: data.power });
      this.setState({ current: data.current });
      this.setState({ price: data.price });
      this.setState({ time: data.connectedTimestamp });
      console.log('Value of current', this.state.current);
    });

    socket.on('statusChanged', (data) => {
      data = JSON.parse(data);
      if (data.status === 'OFF') {
        this.setState({ toggle: false });
      } else {
        this.setState({ toggle: true });
      }
    });

    socket.on('newLog', (log) => {
      log = JSON.parse(log);
      this.setState({ energy: log.energy });
      this.setState({ voltage: log.voltage });
      this.setState({ power: log.power });
      this.setState({ current: log.current });
    });
    socket.on('error', (data) => {
      console.log('error about device', data);

      // return (
      //   this.props.navigation.replace('QrScreen', {
      //     connection: 'reset',
      //     error: 'Charger already connected to other device',
      //   }),
      //   ToastAndroid.showWithGravityAndOffset(
      //     'Charger already connected to other device',
      //     ToastAndroid.LONG,
      //     ToastAndroid.CENTER,
      //     25,
      //     50,
      //   )
      // );
      // return this.setState({error: data});
    });
    // socket.on('chargerDisconnected', (data) => {
    //   console.log('charger disconnected from device', data);
    // });

    socket.emit('connect_to_thing', id);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loaded ? (
          <View>
            <View style={styles.container}>
              <Image
                source={require('../assets/status.png')}
                style={styles.image}
              />
            </View>

            <View
              flexDirection="column"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp('13%'),
              }}>
              <LinearGradient
                colors={['#4B5358', '#545B60']}
                style={styles.box3}>
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
                        fontSize: wp('5%'),
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
                <View style={{ marginRight: wp('2%') }}>
                  <Text
                    style={{
                      fontSize: wp('5%'),
                      color: 'white',
                      fontFamily: 'SF-Pro-Display-Semibold',
                      padding: wp('1%'),
                    }}>
                    <Date tm={this.state.time}></Date>
                  </Text>
                </View>
              </LinearGradient>

              <LinearGradient
                colors={['#03AD70', '#059863']}
                style={styles.box1}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <EnergyConsumed
                    height={hp('6%')}
                    width={wp('15%')}
                    borderRadius={wp('10%') / 8}
                  />
                  <View style={{ marginRight: wp('4%') }}>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Display-Medium',
                        color: 'white',
                        fontSize: wp('5%'),
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
                </View>

                <Text
                  style={{
                    fontSize: wp('5.6%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    padding: wp('1%'),
                  }}>
                  {this.state.energy} kWh
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#2D9CDB', '#2C93CE']}
                style={styles.box2}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Cost
                    height={hp('6%')}
                    width={wp('15%')}
                    borderRadius={wp('10%') / 8}
                  />
                  <View style={{ marginRight: wp('4%') }}>
                    <Text
                      style={{
                        fontFamily: 'SF-Pro-Display-Medium',
                        color: 'white',
                        fontSize: wp('5%'),
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

                <Text
                  style={{
                    fontSize: wp('6%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Semibold',
                    padding: wp('1%'),
                  }}>
                  {'\u20B9'}
                  {(
                    this.state.energy * this.state.price +
                    this.state.energy * this.state.price * 0.15
                  ).toFixed(2)}
                </Text>
              </LinearGradient>
            </View>
            <View style={styles.switch}>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                onValueChange={this.toggleSwitch}
                value={this.state.toggle}
                style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
              />

              <Text style={styles.textStyle}>
                {this.state.toggle ? 'ON' : 'OFF'}
              </Text>
              {/* <Text style={styles.textStyle}>{this.state.error}</Text> */}
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
              autoPlay
              loop
              source={require('../assets/animations/connecting.json')}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('20%'),
    width: wp('80%'),

    marginLeft: 35,
  },

  text: {
    color: 'black',
    height: hp('6%'),
    width: wp('20%'),
    fontSize: hp('2.5%'),
  },

  switch: {
    height: hp('20%'),
    width: wp('80%'),
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    height: hp('15%'),
    width: wp('100%'),
    marginLeft: 0.5,
  },
  textStyle: {
    marginTop: hp('2%'),
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#344953',
  },
  box1: {
    // backgroundColor: "#03AD70",
    height: hp('13%'),
    width: wp('74%'),
    borderRadius: hp('20%') / 16,
    padding: 5,
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
    padding: 5,
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
    padding: 5,
    marginTop: hp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
