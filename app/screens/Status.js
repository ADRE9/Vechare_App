/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

function Status(props) {
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
      <View style={{marginTop: 30}}>
        {/* <Button
          title="next"
          onPress={() => props.navigation.navigate('AppBottom')}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
});

export default Status;
