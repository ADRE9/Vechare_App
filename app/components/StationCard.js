import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function StationCard({dis, loc, device}) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.heading}>{device}</Text>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', marginTop: wp('1.4%')}}>
              <Image source={require('../assets/tick.png')} />
              <Text style={styles.status}>Available</Text>
            </View>
            <Text style={styles.loc}>{loc}</Text>
          </View>
        </View>
        <View style={{position: 'absolute', left: wp('27%')}}>
          <View
            style={{
              flexDirection: 'column',
              marginTop: -wp('1%'),
            }}>
            <Text style={styles.txt}>Distance: {dis} Km away</Text>
            <Text style={styles.txt2}>Operator: veCharge Community</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{marginLeft: wp('14%')}}>
              <Image
                source={require('../assets/navigate.png')}
                style={{
                  height: hp('7%'),
                  width: wp('18%'),
                  borderRadius: hp('4%') / 4,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{marginLeft: wp('6%')}}>
              <Image
                source={require('../assets/charge_now.png')}
                style={{
                  height: hp('7%'),
                  width: wp('18%'),

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
    borderRadius: 10,
    borderColor: '#7c7c7c',
    // borderWidth: 0.3,
    overflow: Platform.OS === 'android' ? 'hidden' : '',
    paddingLeft: wp('5%'),
    padding: 30,
    paddingTop: wp('3%'),

    marginRight: wp('2%'),
    marginBottom: 20,
    height: hp('14%'),
    width: wp('93%'),
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
    fontSize: wp('5.7%'),
    marginTop: -wp('2%'),
  },
  status: {
    color: '#333333',
    fontFamily: 'OpenSans-Regular',
  },
  loc: {
    color: '#484848',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: wp('2.5%'),
    marginTop: wp('8%'),
    position: 'absolute',
  },
  subtitle: {
    backgroundColor: '#00A2FD',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: -wp('32%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: wp('6%'),
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
    marginTop: wp('6%'),
  },
  txt: {
    marginTop: wp('3%'),
    marginLeft: wp('20%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
    // position: 'absolute',
  },
  txt2: {
    marginTop: wp('2%'),
    marginLeft: wp('20%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
});

export default StationCard;
