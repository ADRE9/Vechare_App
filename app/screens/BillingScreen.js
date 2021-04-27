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

  useEffect(() => {
    async function data() {
      const am = await AsyncStorage.getItem('amount');
      const amnt = await AsyncStorage.getItem('amnt');
      setAmount(am);
      setAmnt(amnt);
    }
    data();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View flexDirection="column">
          <ImageBackground
            source={require('../assets/receipt.png')}
            style={{width: wp('100%'), height: hp('16%')}}
            resizeMode="cover">
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                source={require('../assets/Back.png')}
                style={styles.back}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/car.png')}
            style={{width: wp('100%'), height: hp('35%')}}
            resizeMode="cover">
            <Text style={styles.content1}>14/03/21, 7:45 AM</Text>
            <Text style={styles.content2}>
              Rohini Community Charging Station, B-5/30, New Delhi - 110034
            </Text>
            <Text style={styles.receipt}>Receipt for Charging Session</Text>
          </ImageBackground>
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
            <Text style={styles.subtxt2}>{'\u20B9'} 0.00 </Text>
          </View>
          <View style={styles.line} />

          <View
            flexDirection="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.subtxt1}>Amount Paid</Text>
            <Text style={styles.subtxt2}>
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
    width: wp('5%'),
    height: hp('3%'),
    marginLeft: wp('2%'),
    marginTop: wp('9%'),
  },
  content1: {
    fontSize: wp('5%'),
    color: '#3D3D3D',
    marginTop: wp('3%'),
    marginLeft: wp('6%'),
  },
  content2: {
    fontSize: wp('3%'),
    color: '#484848',
    marginTop: wp('1.6%'),
    marginRight: wp('40%'),
    marginLeft: wp('6%'),
  },
  receipt: {
    width: wp('30%'),
    fontWeight: 'bold',
    fontSize: wp('5.2%'),
    color: '#3D3D3D',
    marginLeft: wp('5%'),
    marginTop: wp('4%'),
  },
  txt1: {
    color: '#3D3D3D',
    fontWeight: 'bold',
    marginRight: wp('20%'),
    marginTop: wp('4%'),
    fontSize: wp('5.5%'),
    marginLeft: wp('15%'),
  },
  txt2: {
    color: '#3D3D3D',
    fontWeight: 'bold',
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
    marginLeft: wp('11%'),
  },
  subtxt2: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('16%'),
  },
  subtxt3: {
    color: '#3D3D3D',
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('15%'),
    marginRight: wp('30'),
  },
  subtxt4: {
    color: '#3D3D3D',
    marginRight: wp('20%'),
    marginTop: wp('3%'),
    fontSize: wp('3.5%'),
    marginLeft: wp('20%'),
  },
});

export default BillingScreen;
