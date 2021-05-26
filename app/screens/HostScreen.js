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
import {BecomeHostBtn} from 'svg';
import HostCarousel from '../components/HostCarousel';

function HostScreen({navigation}) {
  return (
    <SafeAreaView style={styles.cont}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 10,
          marginLeft: 32,
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
        Power Up {'\n'}your Parking with {'\n'}
        <Text style={{color: '#2279B9'}}>veCharge Point</Text>
      </Text>
      <View>
        <HostCarousel />
        <TouchableOpacity
          activeOpacity={0.6}
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('RegisterHost')}>
          <BecomeHostBtn width={270} />
        </TouchableOpacity>
      </View>
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
    marginLeft: 35,
    marginTop: 10,
    letterSpacing: 1,
  },
});

export default HostScreen;
