/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Switch, StyleSheet, TouchableOpacity, Text} from 'react-native';
import io from 'socket.io-client';

import '../Constants/Useragent';

const socket = io('http://ec2-15-206-146-91.ap-south-1.compute.amazonaws.com');
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }
  toggleSwitch = () => {
    fetch(
      `http://ec2-15-206-146-91.ap-south-1.compute.amazonaws.com/${
        this.state.toggle === false ? 'on' : 'off'
      }/test`,
    );
  };

  componentDidMount() {
    socket.connect();
    socket.on('thing_connected', (data) => {
      console.log(data);
    });
    socket.emit('connect_to_thing', 'test');
    socket.on('status_changed', (data) => {
      data = JSON.parse(data);
      if (data.status === 'OFF') {
        this.setState({toggle: false});
      } else {
        this.setState({toggle: true});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Energy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Price</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Volt </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Current</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switch}>
          <Text style={{}}>{this.state.toggle ? 'on' : 'off'}</Text>
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
    marginTop: 10,
  },
  button: {
    backgroundColor: '#24669b',
    padding: 40,
    marginHorizontal: 40,
    marginVertical: 40,
  },
  text: {
    color: 'white',
  },
  switch: {
    marginHorizontal: 180,

    paddingVertical: 10,
  },
});
