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
import {ReceiptBtn, ReportBtn, Continue} from 'svg';

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
  const disconnect = async () => {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const id = await AsyncStorage.getItem('idValue');
    // const idValue = await AsyncStorage.getItem('id');
    // console.log('Value of id', idValue);
    await fetch(
      `https://vecharge.app/api/v1/charger/removeChargerFromUser/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
  };

  return (
    <ScrollView style={styles.cont}>
      <SafeAreaView style={styles.cont}>
        <View>
          <ImageBackground
            source={require('../assets/finalCharge.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            {/* <Image
              source={require('../assets/Back.png')}
              style={{
                width: wp('5%'),
                height: hp('3%'),
                marginLeft: wp('3%'),
                marginTop: wp('9%'),
              }}
            /> */}
          </ImageBackground>
        </View>

        <View flexDirection="row">
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
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: wp('5%'),
                    marginTop: wp('2%'),
                    fontFamily: 'SF-Pro-Display-Medium',
                  }}>
                  Energy
                </Text>
                <Text
                  style={{
                    fontSize: wp('3.5%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Regular',
                  }}>
                  Consumed
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: wp('6%'),
                color: 'white',
                fontFamily: 'SF-Pro-Display-Semibold',
                padding: wp('1%'),
                marginTop: wp('4%'),
                marginLeft: wp('3%'),
              }}>
              {energy} kWh
            </Text>
          </View>

          <View style={styles.box2} flexDirection="column">
            <View flexDirection="row">
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
                <Text
                  style={{
                    fontFamily: 'SF-Pro-Display-Medium',
                    color: 'white',
                    fontSize: wp('5%'),
                    marginTop: wp('2%'),
                  }}>
                  Amount
                </Text>
                <Text
                  style={{
                    fontSize: wp('3.5%'),
                    color: 'white',
                    fontFamily: 'SF-Pro-Display-Regular',
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
                marginTop: wp('4%'),
                marginLeft: wp('4%'),
              }}>
              {amount} INR
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: wp('6%'),
            color: '#3D3D3D',
            marginTop: wp('4%'),
            marginLeft: wp('6%'),
            fontFamily: 'SF-Pro-Display-Medium',
          }}>
          {currentDate}
        </Text>
        <Text
          style={{
            fontSize: wp('3.8%'),
            color: '#484848',
            marginTop: wp('2%'),
            marginRight: wp('20%'),
            marginLeft: wp('6%'),
            fontFamily: 'SF-Pro-Display-Regular',
          }}>
          Rohini Community Charging Station, B-5/30, New Delhi - 110034
        </Text>
        <View flexDirection="row">
          <TouchableOpacity
            style={{
              marginLeft: wp('5%'),
              borderRadius: wp('6%') / 2,
              marginTop: wp('10%'),
            }}
            activeOpacity={0.6}
            onPress={() =>
              // props.navigation.navigate('Receipt')}
              console.log('receipt')
            }>
            <ReceiptBtn width={wp('42%')} height={hp('5.5%')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: wp('6%'),
              borderRadius: wp('6%') / 2,
              marginTop: wp('10%'),
            }}
            activeOpacity={0.6}
            onPress={() =>
              // props.navigation.navigate('Report')}
              console.log('report')
            }>
            <ReportBtn width={wp('42%')} height={hp('5.5%')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: wp('20%'),
            marginTop: wp('16%'),
            width: wp('60%'),
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            activeOpacity={0.5}
            onPress={() =>
              // disconnect()
              //   .then(() => clearStorage())
              //   .finally(() =>
              //     props.navigation.reset({
              //       index: 0,
              //       routes: [{ name: 'AppBottom' }],
              //     }),
              //   )
              console.log('yes')
            }>
            <Continue
              width={wp('66%')}
              height={hp('8%')}
              borderRadius={wp('6%') / 2}
            />
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
