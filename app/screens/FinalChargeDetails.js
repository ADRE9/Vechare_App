import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {ReceiptBtn, ReportBtn, Continue, Report} from 'svg';
import CustomBack from '../components/CustomBack';

function FinalChargeDetails(props) {
  const [amount, setAmount] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    async function data() {
      const am = await AsyncStorage.getItem('amount');
      const en = await AsyncStorage.getItem('energy');
      setAmount(am);
      setEnergy(en);
      var date = moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm a');
      setCurrentDate(date);
    }
    data();
    console.log('Final Charging Screen');
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('amount');
      await AsyncStorage.removeItem('amnt');
      await AsyncStorage.removeItem('energy');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('pyt');
      await AsyncStorage.removeItem('pytId');
    } catch (e) {
      console.log(e);
    }
  };
  // const disconnect = async () => {
  //   const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const id = await AsyncStorage.getItem('idValue');
  //   // const idValue = await AsyncStorage.getItem('id');
  //   // console.log('Value of id', idValue);
  //   await fetch(
  //     `https://vecharge.app/api/v1/charger/removeChargerFromUser/${id}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token,
  //       },
  //     },
  //   );
  // };

  return (
    <ScrollView style={styles.cont}>
      <SafeAreaView style={styles.cont}>
        <View>
          <ImageBackground
            source={require('../assets/chargeDetails.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <Text style={styles.header}>Charging Details</Text>
          </ImageBackground>
        </View>

        <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
          <View style={styles.box1}>
            <View flexDirection="row">
              <Image
                source={require('../assets/energy-icon.png')}
                style={{
                  height: 40,
                  width: 40,
                  marginLeft: 8,
                  marginTop: 12,
                  borderRadius: 4,
                }}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    marginTop: 12,
                    marginLeft: 10,
                    fontFamily: 'SF-Pro-Display-Medium',
                  }}>
                  Energy
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',

                    marginLeft: 10,
                    fontFamily: 'SF-Pro-Display-Regular',
                  }}>
                  Consumed
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
                padding: 3,
                marginTop: 12,
                marginLeft: 10,
              }}>
              {energy} kWh
            </Text>
          </View>

          <View style={styles.box2} flexDirection="column">
            <View flexDirection="row">
              <Image
                source={require('../assets/cost.png')}
                style={{
                  height: 40,
                  width: 40,
                  marginLeft: 8,
                  marginTop: 12,
                  borderRadius: 4,
                }}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    marginTop: 12,
                    marginLeft: 10,
                    fontFamily: 'SF-Pro-Display-Medium',
                  }}>
                  Amount
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',

                    marginLeft: 10,
                    fontFamily: 'SF-Pro-Display-Regular',
                  }}>
                  Payable
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
                padding: 3,
                marginTop: 12,
                marginLeft: 10,
              }}>
              {amount} INR
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            color: '#3D3D3D',
            marginTop: 30,
            marginLeft: 40,
            fontFamily: 'SF-Pro-Display-Medium',
          }}>
          {currentDate}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#484848',
            marginTop: 5,
            marginRight: 36,
            marginLeft: 40,
            fontFamily: 'SF-Pro-Display-Regular',
          }}>
          Rohini Community Charging Station, B-5/30, New Delhi - 110034
        </Text>
        <View flexDirection="row">
          <TouchableOpacity
            style={{
              marginLeft: 40,

              marginTop: 20,
            }}
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('Receipt')}>
            <Report width={140} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('Report')}>
            <ReportBtn width={140} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              clearStorage().finally(() =>
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'AppBottom'}],
                }),
              )
            }>
            <Continue width={250} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 28,
    marginLeft: 60,
    marginTop: 30,
  },
  box1: {
    backgroundColor: '#03AD70',
    height: 120,
    width: 140,
    borderRadius: 12,
    padding: 5,
    marginTop: 40,
  },
  box2: {
    backgroundColor: '#2D9CDB',
    height: 120,
    width: 140,
    borderRadius: 12,
    padding: 5,
    marginTop: 40,
  },
  btn1: {
    width: wp('38%'),
    height: hp('5.5%'),
    marginLeft: wp('8%'),
    borderRadius: wp('6%') / 2,
    marginTop: wp('10%'),
  },
  btn2: {
    width: wp('38%'),
    height: hp('5.5%'),
    marginLeft: wp('8%'),
    borderRadius: wp('6%') / 2,
    marginTop: wp('10%'),
  },
  btn3: {
    width: wp('60%'),
    height: hp('6%'),
    borderRadius: wp('6%') / 2,
  },
});
export default FinalChargeDetails;
