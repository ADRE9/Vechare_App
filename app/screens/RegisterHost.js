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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function RegisterHost(props) {
  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/register.png')}
          resizeMode="cover"
          style={styles.register}
        />
        <View
          style={{
            position: 'absolute',
            left: 15,
            top: 30,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.goBack()}>
            <Image
              source={require('../assets/Back.png')}
              style={{height: hp('4%'), width: wp('8%')}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter Name" />
        </View>
        <View>
          <Text style={styles.heading}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Enter Phone Number" />
        </View>
        <View>
          <Text style={styles.heading}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full address"
          />
        </View>
        <View>
          <Text style={styles.heading}>Email Address</Text>
          <TextInput style={styles.input} placeholder="Enter Email Address" />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: wp('14%'),
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('BecomeHost')}>
            <Image
              source={require('../assets/nextHost.png')}
              style={{
                height: hp('7%'),
                width: wp('70%'),

                borderRadius: wp('40%') / 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  register: {
    height: hp('15%'),
    width: wp('100%'),
  },
  heading: {
    marginLeft: wp('11%'),
    marginTop: wp('10%'),
    fontSize: wp('4.3%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Semibold',
  },
  input: {
    marginLeft: wp('10%'),
    marginTop: -wp('1%'),
    fontSize: wp('4%'),
    color: '#7C7C7C',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 2,
    marginRight: wp('20%'),
    padding: wp('2%'),
  },
});

export default RegisterHost;
