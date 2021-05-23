import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';

function SessionCard({amount, days, loc, energy, device, lat, long}) {
  function DateCh({tm}) {
    return moment(tm, 'YYYYMMDD').fromNow();
  }
  function OpenGps({latitude, longitude}) {
    const openGps = () => {
      var scheme =
        Platform.OS === 'ios' ? 'maps://app?daddr=' : 'google.navigation:q=';
      var url = scheme + `${latitude}+${longitude}`;
      Linking.openURL(url);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={openGps}
        style={{marginLeft: wp('10%')}}>
        <Image
          source={require('../assets/navigate.png')}
          style={{
            height: hp('7%'),
            width: wp('20%'),
            borderRadius: hp('4%') / 4,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.heading}>{device}</Text>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', marginTop: wp('1.2%')}}>
              <Image source={require('../assets/tick.png')} />
              <Text style={styles.status}>Available</Text>
            </View>
            <Text style={styles.subtxt}>
              Last Charged: <DateCh tm={days}></DateCh>
            </Text>
            <Text style={styles.loc}>{loc}</Text>
          </View>
        </View>
        <View style={{position: 'absolute', left: wp('30%')}}>
          <View style={{flexDirection: 'column', marginTop: -wp('1%')}}>
            <Text style={styles.txt2}>Operator: veCharge Community</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subtitle}>
                {'\u20B9'} {amount}
              </Text>
              <Text style={styles.subtitle2}>{energy} kwh</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <OpenGps latitude={lat} longitude={long}></OpenGps>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{marginLeft: wp('4%')}}>
              <Image
                source={require('../assets/charge_now.png')}
                style={{
                  height: hp('7%'),
                  width: wp('20%'),
                  borderRadius: hp('4%') / 4,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    // borderWidth: 0.3,
    overflow: Platform.OS === 'android' ? 'hidden' : '',
    paddingLeft: wp('5%'),
    padding: 10,
    marginVertical: hp('1%'),
    top: hp('-10.5%'),
    marginBottom: hp('1%'),
    height: hp('17%'),
    width: wp('94%'),
    left: wp('3%'),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  heading: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'black',
    fontSize: wp('5.8%'),
    marginTop: -wp('1%'),
  },
  status: {
    color: '#333333',
    fontFamily: 'OpenSans-Regular',
  },
  loc: {
    color: '#484848',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: wp('2.8%'),
    marginTop: wp('15%'),

    position: 'absolute',
  },
  txt: {
    marginTop: wp('3%'),
    marginLeft: -wp('32%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
  subtxt: {
    marginTop: wp('2%'),

    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.7%'),
  },
  txt2: {
    marginTop: wp('16%'),
    marginLeft: wp('15%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.7%'),
  },
  subtitle: {
    backgroundColor: '#00A2FD',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: wp('18%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: -wp('18%'),
    marginRight: wp('10%'),
  },
  subtitle2: {
    backgroundColor: '#05C07D',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: -wp('6%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: -wp('18%'),
  },
});

export default SessionCard;
