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

function BillingScreen(props) {
  const [amount, setAmount] = useState([]);
  const [amunt, setAmnt] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    async function data() {
      const am = await AsyncStorage.getItem('amount');
      const amnt = await AsyncStorage.getItem('amnt');
      setAmount(am);
      setAmnt(amnt);
    }
    data();
  }, []);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <View flexDirection="column">
          <ImageBackground
            source={require('../assets/receipt.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.back}>
              <Image
                style={{width: wp('5%'), height: hp('3%')}}
                source={require('../assets/Back.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={{marginTop: -wp('5%')}}>
            <ImageBackground
              source={require('../assets/car.png')}
              style={{width: wp('100%'), height: hp('35%')}}
              resizeMode="cover">
              <Text style={styles.content1}>{currentDate} AM</Text>
              <Text style={styles.content2}>
                Rohini Community Charging Station, B-5/30, New Delhi - 110034
              </Text>
              <Text style={styles.receipt}>Receipt for Charging Session</Text>
            </ImageBackground>
          </View>
          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.txt1}>Total</Text>
            <Text style={styles.txt2}>
              {'\u20B9'} {amount}
            </Text>
          </View>
          <View style={styles.line} />

          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt1}>Operator cost</Text>
            <Text style={styles.subtxt2}>
              {'\u20B9'} {amunt}
            </Text>
          </View>

          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt1}>Service charge</Text>
            <Text style={styles.subtxt2}>
              {'\u20B9'} {(amunt * 0.15).toFixed(2)}
            </Text>
          </View>

          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt3}>Taxes</Text>
            <Text style={styles.subtxt5}>{'\u20B9'} 00.00 </Text>
          </View>

          <View style={styles.line} />

          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt1}>Amount Paid</Text>
            <Text style={styles.subtxt4}>
              {'\u20B9'} {amount}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    position: 'absolute',
    top: 35,
    left: 6,
  },
  content1: {
    fontSize: wp('5%'),
    color: '#3D3D3D',
    marginTop: wp('3%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
  content2: {
    fontSize: wp('3%'),
    color: '#484848',
    marginTop: wp('1.6%'),
    marginRight: wp('40%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Regular',
  },
  receipt: {
    width: wp('30%'),
    fontSize: wp('5.2%'),
    color: '#3D3D3D',
    marginLeft: wp('5%'),
    marginTop: wp('4%'),
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  txt1: {
    color: '#3D3D3D',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginRight: wp('20%'),
    marginTop: wp('4%'),
    fontSize: wp('5.5%'),
    marginLeft: wp('15%'),
  },
  txt2: {
    color: '#3D3D3D',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginRight: wp('20%'),
    marginTop: wp('4%'),
    fontSize: wp('5.5%'),
    marginLeft: wp('20%'),
  },
  line: {
    borderBottomColor: '#5F5F5F',
    borderBottomWidth: 0.7,
    width: wp('80%'),
    marginLeft: wp('10%'),
    padding: 2.5,
  },
  subtxt1: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('10%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
  subtxt2: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('15%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
  subtxt3: {
    color: '#3D3D3D',
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('10%'),
    marginRight: wp('30'),
  },
  subtxt4: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('20%'),
  },
  subtxt5: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('22%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
});

export default BillingScreen;
