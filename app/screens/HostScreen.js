import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BecomeHostBtn } from 'svg';
import HostCarousel from '../components/HostCarousel';

function HostScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.cont}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: hp('2%'),
          marginLeft: wp('8%'),
        }}>
        <Image
          source={require('../assets/Back4.png')}
          style={{
            height: 25.2,
            width: 25,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.header}>
        Power up {'\n'}your Parking with {'\n'}
        <Text style={{ color: '#2279B9' }}>veCharge Point</Text>
      </Text>
      <HostCarousel />
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          top: hp('85%'),
          left: wp('14%'),
        }}
        onPress={() => navigation.navigate('RegisterHost')}>
        <BecomeHostBtn width={wp('65%')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 36,
    color: '#181725',
    marginLeft: wp('10%'),
    marginTop: hp('3%'),
    letterSpacing: 1,
  },
});

export default HostScreen;
