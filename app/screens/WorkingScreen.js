import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Work1, Img1, Img2, Img3, BecomeHostBtn } from 'svg';

function WorkingScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 32,
          marginLeft: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/Back4.png')}
          style={{
            height: 25.2, width: 25
          }}
        />
      </TouchableOpacity>
      <Text style={styles.header}>
        <Text style={styles.sub}>veCharge</Text> Mobile App {'\n'}for the users{' '}
      </Text>
      <Text style={styles.subtxt}>Charge your vehicle with simple steps</Text>
      <Work1 height={hp('30%')} width={wp('90%')} />
      <View style={styles.box}>
        <Text style={styles.line1}>1. Locate</Text>
        <Text style={styles.subline1}>
          Once you install the vecharge app, you can start exploring all the
          charging points in veCharge community. Locate the nearest charging
          point or the one which suits you the best.
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.line1}>2. Navigate</Text>
        <Text style={styles.subline1}>
          Head over to your selected charging point and plug in your vehicle
          charger into the device. Scan the QR code on the the veCharge point.
          That’s it, your charging has now started.
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.line1}>3. Monitor and Control</Text>
        <Text style={styles.subline1}>
          Once your charging has started, live energy consumption with amount
          charged is relayed to you on the mobile app. You can remotely switch
          off the charging at anytime.
        </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.line1}>4. Pay Digitally</Text>
        <Text style={styles.subline1}>
          Once you switch off the charging, you can now pay digitally to the
          host for the energy consumed. The charging point is now shown in your
          recent sessions.
        </Text>
      </View>

      <View style={styles.break}></View>
      <Text style={styles.header}>
        <Text style={styles.sub}>veCharge</Text> Point {'\n'}for your
        establishment
      </Text>
      <Text style={styles.subtxt2}>Charging point can now be hosted</Text>
      <Text style={styles.line1}>Anywhere by Anyone</Text>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20
        }}>
        <Img1 width={wp('16%')} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: wp('3%'),
          }}>
          <Text style={styles.img1}>Easy Installation of veCharge Points</Text>
          <Text style={styles.subimg}>
            Host multiple charging points which will increase the footfall to
            your establishment. We provide free installation of the veCharge
            point.
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: -40,
          marginLeft: 20,
        }}>
        <Img2 width={wp('16%')} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: wp('3%'),
          }}>
          <Text style={styles.img1}>Host and earn income</Text>
          <Text style={styles.subimg}>
            Earn additional income by setting up your own prices for the
            charging. Withdraw the money to your account easily.
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: -40,
          marginLeft: 20,
        }}>
        <Img3 width={wp('16%')} />
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 15,
            marginRight: wp('3%'),
          }}>
          <Text style={styles.img1}>Complete automated solution</Text>
          <Text style={styles.subimg}>
            Monitor and analyze the charging status of all your devices in
            realtime via veCharge dashboard. The device is a zero maintenance
            product requiring no human intervention.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Host')}
        style={{
          marginTop: hp('5%'),
          marginLeft: wp('20%'),
          marginBottom: hp('10%'),
          width: 220,
        }}>
        <BecomeHostBtn width={220} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontFamily: 'SF-Pro-Text-Semibold',
    fontSize: 26,
    marginLeft: 20,
    marginTop: 15,
    color: '#292929',
  },
  sub: {
    color: '#069DFF',
  },
  subtxt: {
    fontFamily: 'SF-Pro-Text-Medium',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 5,
    color: '#0D0D0D',
  },
  subtxt2: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 16,
    marginLeft: 20,
    marginTop: hp('1%'),
    color: '#0D0D0D',
  },
  box: {
    marginVertical: 10,
  },
  line1: {
    fontFamily: 'SF-Pro-Text-Semibold',
    fontSize: 17,
    marginLeft: 20,
    color: '#0D0D0D',
  },
  subline1: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 28,
  },
  break: {
    borderBottomColor: '#626262',
    borderBottomWidth: 0.3,
    width: wp('70%'),
    marginTop: 10,
    height: 10,
    marginLeft: 40,
    marginBottom: 20,
  },
  img1: {
    color: '#0D0D0D',
    fontFamily: 'SF-Pro-Text-Semibold',
    fontSize: 14,
  },
  subimg: {
    color: 'black',
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 10,
    marginRight: wp('16%'),
  },
});

export default WorkingScreen;
