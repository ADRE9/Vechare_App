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
    }
    data();
  }, []);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('amount');
      await AsyncStorage.removeItem('amnt');
      await AsyncStorage.removeItem('energy');
      await AsyncStorage.removeItem('id');
    } catch (e) {
      console.log(e);
    }
  };
  // const disconnect = async () => {
  //   const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //   const id = await AsyncStorage.getItem('id');
  //   await fetch(
  //     `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/charger/removeChargerFromUser/${id}`,
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
            source={require('../assets/finalCharge.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <Image
              source={require('../assets/Back.png')}
              style={{
                width: wp('5%'),
                height: hp('3%'),
                marginLeft: wp('3%'),
                marginTop: wp('9%'),
              }}
            />
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
                fontSize: wp('7%'),
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
                fontSize: wp('8%'),
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
          {currentDate} AM
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
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('Receipt')}>
            <Image
              source={require('../assets/receiptBtn.png')}
              style={styles.btn1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.navigation.navigate('Report')}>
            <Image
              source={require('../assets/reportbtn.png')}
              style={styles.btn2}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: wp('20%'),
            marginTop: wp('16%'),
            width: wp('60%'),
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              clearStorage().finally(() =>
                props.navigation.replace('AppBottom'),
              )
            }>
            <Image
              source={require('../assets/continue.png')}
              style={styles.btn3}
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
    height: hp('5%'),
    marginLeft: wp('8%'),
    borderRadius: wp('6%') / 2,
    marginTop: wp('10%'),
  },
  btn2: {
    width: wp('38%'),
    height: hp('5%'),
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
