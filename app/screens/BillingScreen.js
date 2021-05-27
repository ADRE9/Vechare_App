import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import {Receipt, ReceiptBg, Car1} from 'svg';
import CustomBack from '../components/CustomBack';

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
    console.log('Receipt SCreen');
  }, []);

  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm a');
    setCurrentDate(date);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View flexDirection="column">
          <Receipt width={wp('101%')} height={hp('16%')} />

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              position: 'absolute',
              marginLeft: 15,
              marginTop: 30,
            }}
            onPress={() => props.navigation.goBack()}>
            <CustomBack />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              marginTop: 96,
            }}>
            <ReceiptBg width={wp('102%')} height={hp('30%')} />

            <Text style={styles.content1}>{currentDate} </Text>
            <Text style={styles.content2}>
              Rohini Community Charging Station, B-5/30, New Delhi - 110034
            </Text>
          </View>
          <Car1 width={wp('50%')} height={hp('30%')} left={180} marginTop={5} />
          <Text style={styles.txt}>Receipt for{'\n'}Charging Session</Text>

          <View flexDirection="row">
            <Text style={styles.txt1}>Total</Text>
            <Text style={styles.txt2}>
              {'\u20B9'} {amount}
            </Text>
          </View>
          <View style={styles.line} />

          <View flexDirection="row">
            <Text style={styles.subtxt1}>Operator cost</Text>
            <Text style={styles.subtxt2}>
              {'\u20B9'} {amunt}
            </Text>
          </View>

          <View flexDirection="row">
            <Text style={styles.subtxt1}>Service charge</Text>
            <Text style={styles.subtxt2}>
              {'\u20B9'} {(amunt * 0.15).toFixed(2)}
            </Text>
          </View>

          <View flexDirection="row">
            <Text style={styles.subtxt3}>Taxes</Text>
            <Text style={styles.subtxt5}>{'\u20B9'} 00.00 </Text>
          </View>

          <View style={styles.line} />

          <View flexDirection="row">
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
    backgroundColor: '#FFFFFF',
  },
  back: {
    position: 'absolute',
    top: 35,
    left: 15,
  },
  content1: {
    fontSize: wp('5%'),
    color: '#3D3D3D',
    marginTop: wp('4%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Medium',
    position: 'absolute',
  },
  content2: {
    fontSize: wp('3.2%'),
    color: '#484848',
    marginTop: hp('6%'),
    marginRight: wp('40%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Regular',
    position: 'absolute',
  },

  txt1: {
    color: '#3D3D3D',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginTop: wp('4%'),
    fontSize: wp('5.5%'),
    marginLeft: wp('10%'),
    position: 'absolute',
  },
  txt2: {
    color: '#3D3D3D',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginTop: wp('4%'),
    fontSize: wp('5.5%'),
    marginLeft: wp('65%'),
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
    paddingTop: 10,
    fontSize: wp('3.5%'),
    marginLeft: wp('10%'),
    fontFamily: 'SF-Pro-Display-Medium',
    position: 'absolute',
    left: wp('1%'),
  },
  subtxt2: {
    color: '#3D3D3D',
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('68%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
  subtxt3: {
    color: '#3D3D3D',
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    position: 'absolute',
    left: wp('11%'),
  },
  subtxt4: {
    color: '#3D3D3D',
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('69%'),
  },
  subtxt5: {
    color: '#3D3D3D',
    paddingBottom: 10,
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('68%'),
    fontFamily: 'SF-Pro-Display-Medium',
  },
  txt: {
    fontFamily: 'SF-Pro-Display-Semibold',
    position: 'absolute',
    top: 180,
    left: 20,
    fontSize: 20,
  },
});

export default BillingScreen;
