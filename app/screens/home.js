import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {BoxShadow} from 'react-native-shadow';

import loader from '../components/loader';
import Carousel from '../components/Carousel';
import CarouselRecent from '../components/CarouselRecent';
import {HomeScreen, Host, More} from 'svg';

export default function Home({navigation}) {
  const [name, setName] = useState([]);
  const [load, setLoad] = useState(false);

  const shadowOpt = {
    width: wp('62%'),
    height: hp('5.6%'),
    color: '#069DFF',
    border: 12,
    // radius: 6,
    opacity: 0.2,
    x: 14,
    y: 23,
    style: {marginBottom: hp('8%')},
  };

  useEffect(() => {
    loader.loading((v) => setLoad(true));
    async function value() {
      const user = await AsyncStorage.getItem('name');
      setName(user.split(' ')[0]);
    }

    value();
    console.log('home SCreen');
  }, []);

  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <View>
          <HomeScreen width={wp('100%')} height={hp('22%')} />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: wp('-4%'),
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 28,
                color: 'white',
                marginTop: 10,
                marginRight: 158,
                marginBottom: wp('15%'),
                fontFamily: 'SF-Pro-Text-Bold',
              }}>
              Hello {name},
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Host')}
            activeOpacity={0.6}
            style={{marginLeft: wp('15%'), marginTop: -wp('6%')}}>
            <BoxShadow setting={shadowOpt}>
              <Host width={wp('70%')} height={hp('12%')} />
            </BoxShadow>
          </TouchableOpacity>
        </View>
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
                fontSize: wp('5.7%'),
                marginLeft: wp('5%'),
                marginTop: hp('0.1%'),
              }}>
              Charging Points Near Me
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Station')}
              activeOpacity={0.5}
              style={{
                marginLeft: wp('6%'),
                marginTop: hp('0.5%'),
              }}>
              <More width={wp('20%')} height={hp('3.8%')} />
            </TouchableOpacity>
          </View>
        </View>
        <Carousel />
        <View>
          <View flexDirection="row">
            <Text
              style={{
                fontSize: 22,
                marginLeft: 30,
                marginTop: 10,
                fontFamily: 'SF-Pro-Display-Semibold',
                color: '#181725',
              }}>
              Recent Sessions
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Session')}
              activeOpacity={0.5}
              style={{marginLeft: wp('10%'), marginTop: wp('3%')}}>
              <More width={wp('20%')} height={hp('3.8%')} />
            </TouchableOpacity>
          </View>
        </View>
        <CarouselRecent />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
});
