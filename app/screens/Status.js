/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
  Image,
  Switch,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import '../Constants/Useragent';

// const id = 'test';

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      voltage: '',
      current: '',
      power: '',
      energy: '',
      price: '',
    };
  }
  disconnect = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const res = await fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/removeChargerFromUser/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    const resData = await res.json();
    if (resData.status === 'success') {
      this.setState({toggle: false});
    }
  };

  switchoff = async () => {
    var token = `Bearer ${await AsyncStorage.getItem('token')}`;
    var id = await AsyncStorage.getItem('id');

    fetch(
      `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/chargerDesiredState`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          status: this.state.toggle === false ? 'ON' : 'OFF',
          chargerId: id,
        }),
      },
    );
  };
  toggleSwitch = async () => {
    if (this.state.toggle === false) {
      var token = `Bearer ${await AsyncStorage.getItem('token')}`;
      var id = await AsyncStorage.getItem('id');

      fetch(
        `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/chargerDesiredState`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            status: this.state.toggle === false ? 'ON' : 'OFF',
            chargerId: id,
          }),
        },
      );
    } else {
      Alert.alert(
        'Connection',

        'Do you wish to stop charging ?',
        [
          {
            text: 'Disconnect,Generate Bill',
            onPress: () =>
              this.disconnect().then(() =>
                this.props.navigation.replace('Payment'),
              ),
          },

          {
            text: 'No',
            onPress: () => console.log('No'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
        //clicking out side of alert will not cancel
      );
    }
  };

  async componentDidMount() {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const id = await AsyncStorage.getItem('id');

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
      if (data.status === 'OFF') {
        this.setState({toggle: false});
      } else {
        this.setState({toggle: true});
      }
      this.setState({energy: data.energy});
      this.setState({voltage: data.voltage});
      this.setState({power: data.power});
      this.setState({current: data.current});
      this.setState({price: data.price});
    });

    socket.on('statusChanged', (data) => {
      data = JSON.parse(data);
      if (data.status === 'OFF') {
        this.setState({toggle: false});
      } else {
        this.setState({toggle: true});
      }
    });

    socket.on('newLog', (log) => {
      log = JSON.parse(log);
      this.setState({energy: log.energy});
      this.setState({voltage: log.voltage});
      this.setState({power: log.power});
      this.setState({current: log.current});
    });
    socket.on('error', (data) => {
      console.log(data);
    });
    socket.emit('connect_to_thing', id);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icontainer}>
          <Image
            source={require('../assets/status.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.status}>
          <TouchableOpacity style={styles.details}>
            <Text style={styles.text}>Energy</Text>
            <Text style={styles.value}>{this.state.energy}kWh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.details}>
            <Text style={styles.text}>Price</Text>
            <Text style={styles.value}>
              ₹ {(this.state.energy * this.state.price).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.status}>
          <TouchableOpacity style={styles.details}>
            <Text style={styles.text}>Voltage </Text>
            <Text style={styles.value}>{this.state.voltage} V</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.details}>
            <Text style={styles.text}>Current</Text>
            <Text style={styles.value}>{this.state.current} Amp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switch}>
          {/* <Text style={{}}>{this.state.toggle ? 'on' : 'off'}</Text> */}
          {/* <ToggleSwitch
            isOn={this.state.toggle}
            onColor="green"
            offColor="red"
            label="Connection"
            labelStyle={{color: 'black', fontWeight: '900'}}
            size="large"
            onToggle={this.toggleSwitch}
          /> */}
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            onValueChange={this.toggleSwitch}
            value={this.state.toggle}
            style={{transform: [{scaleX: 2.5}, {scaleY: 2.5}]}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('20%'), // 70% of height device screen
    width: wp('80%'), // 80% of width device screen

    marginLeft: 35,
  },

  text: {
    color: 'black',
    height: hp('6%'), // 70% of height device screen
    width: wp('20%'), // 80% of width device screen
    fontSize: hp('2.5%'), // End result looks like the provided UI mockup
  },
  value: {
    color: 'black',
    height: hp('6%'), // 70% of height device screen
    width: wp('30%'), // 80% of width device
    fontSize: hp('3.5%'), // End result looks like the provided UI mockup
  },
  switch: {
    height: hp('20%'), // 70% of height device screen
    width: wp('80%'), // 80% of width device screen
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    height: hp('20%'), // 70% of height device screen
    width: wp('120%'), // 80% of width device screen
    marginLeft: 2,
  },
});
