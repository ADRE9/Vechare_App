import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {HostBtn} from 'svg';

function HostScreen(props) {
  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <Text style={styles.heading}>Power Up your Parking</Text>
        <Text style={styles.txt}>Host multiple charging points</Text>
        <Text style={styles.txt}>Set up your own prices</Text>
        <Text style={styles.txt}>Monitor and analyze in real-time</Text>
        <Text style={styles.txt}>Withdraw to your account</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('RegisterHost')}
          style={{marginTop: wp('20%'), marginLeft: wp('12%')}}>
          {/* <Image
            source={require('../assets/hostBtn.png')}
            style={{
              height: hp('7%'),
              width: wp('70%'),
              borderRadius: wp('40%') / 8,
            }}
          /> */}
          <HostBtn height={hp('7%')} width={wp('70%')} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: wp('11%'),
    color: '#181725',
    marginLeft: wp('8%'),
    marginTop: wp('16%'),
    marginRight: wp('26%'),
    lineHeight: wp('13%'),
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  txt: {
    marginLeft: wp('10%'),
    marginTop: wp('14%'),
    color: '#7C7C7C',
    fontSize: wp('4%'),
    fontFamily: 'SF-Pro-Display-Semibold',
  },
});

export default HostScreen;
