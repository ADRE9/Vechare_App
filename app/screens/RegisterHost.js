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
import CustomBack from '../components/CustomBack';
import { Book } from 'svg';

function RegisterHost(props) {
  return (
    <SafeAreaView style={styles.cont}>
      <ScrollView style={styles.cont}>
        <ImageBackground
          source={require('../assets/registerHeader.png')}
          resizeMode="cover"
          style={styles.register}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginLeft: 20,
              marginTop: 32,
            }}
            onPress={() => props.navigation.goBack()}>
            <CustomBack
            />

          </TouchableOpacity>
          <Text style={styles.header}>Register</Text>
        </ImageBackground>
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log('book call')}>
            {/* <Image
              source={require('../assets/book.png')}
              style={{
                height: hp('7%'),
                width: wp('70%'),
                borderRadius: wp('40%') / 10,
              }}
            /> */}
            <Book
              height={hp('7%')}
              width={wp('70%')}
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
  header: {
    color: "white",
    fontFamily: "SF-Pro-Text-Bold",
    fontSize: 28,
    marginLeft: 70,
    marginTop: -32,
  },
  register: {
    height: 120,
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
