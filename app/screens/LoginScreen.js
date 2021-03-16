/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

function LoginScreen(props) {
  const [number, setNumber] = useState('');
  const [confirm, setConfirm] = useState(null);

  const signin = async () => {
    const confirmation = await auth().signInWithPhoneNumber('+91' + number);
    console.log('confirmation', confirmation);
    if (confirmation) {
      setConfirm(confirmation);
      props.navigation.navigate('Verify', {confirm: confirmation});
    }
  };

  return (
    <ImageBackground
      source={require('../assets/car.jpg')}
      style={{flex: 1}}
      blurRadius={1.5}>
      <View
        style={{
          height: height,
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 20,
            marginTop: 25,
            marginBottom: 15,
          }}>
          Sign in to continue
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <TextInput
            style={{
              marginBottom: 20,
              color: '#fff',
              width: '100%',
              borderBottomColor: '#f8f8f8',
              borderBottomWidth: 1,
            }}
            placeholder="Enter 10 digit Mobile Number"
            placeholderTextColor="#fff"
            underlineColorAndroid={'transparent'}
            keyboardType="number-pad"
            onChangeText={(value) => setNumber(value)}
            value={number}
            maxLength={10}
          />
          <TouchableOpacity
            onPress={signin}
            // disabled={ number.length == 10 ? false : true}
            style={[
              styles.listView,
              {backgroundColor: number.length == 10 ? '#000' : 'grey'},
            ]}>
            <Text
              style={{
                color: 'seashell',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 25,
              width: '100%',
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  listView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
  },
});
