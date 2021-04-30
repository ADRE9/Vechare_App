import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function FeedBack({navigation}) {
  return (
    <View style={styles.container}>
      <View flexDirection="row">
        <TouchableOpacity
          style={{marginTop: wp('7%'), marginLeft: wp('2%')}}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Back1.png')}
            style={{height: hp('5%'), width: wp('10%')}}
          />
        </TouchableOpacity>

        <Text style={styles.header}>Give Feedback</Text>
      </View>
      <Text style={styles.subtitle}>
        We are always working to improve the veCharge experience. We would love
        to hear what we are doing right and how we can make our service better.
        You can make any suggestion, report a bug, give product review or write
        anything you’d like to tell us.
      </Text>
      <View>
        <Text style={styles.name}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter Name" />
      </View>
      <View>
        <Text style={styles.name}>Contact</Text>
        <TextInput style={styles.input} placeholder="Enter Phone Number" />
      </View>
      <View>
        <Text style={styles.name}>Email Address</Text>
        <TextInput style={styles.input} placeholder="Enter Email Address" />
      </View>
      <View>
        <Text style={styles.name}>Enter Message</Text>
        <TextInput
          style={styles.input2}
          multiline={true}
          placeholder="Enter Message"
        />
      </View>
      <Image
        source={require('../assets/submitBtn.png')}
        resizeMode="contain"
        style={{
          height: hp('5%'),
          width: wp('40%'),
          marginLeft: wp('1%'),
          marginTop: wp('5%'),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: wp('7%'),
    color: '#000000',
    marginTop: wp('6%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Bold',
  },
  subtitle: {
    fontSize: wp('3%'),
    color: '#000000',
    marginTop: wp('4%'),
    marginRight: wp('6%'),
    marginLeft: wp('6%'),
    lineHeight: wp('4%'),
    fontFamily: 'SF-Pro-Display-Regular',
  },
  name: {
    marginLeft: wp('6%'),
    fontSize: wp('3%'),
    color: '#000000',
    marginTop: wp('4%'),
  },
  input: {
    marginLeft: wp('6%'),
    fontSize: wp('3%'),
    color: '#7B7B7B',
    marginTop: wp('2%'),
    backgroundColor: '#EFEFEF',
    marginRight: wp('8%'),
    borderRadius: wp('6%') / 3,
    padding: 4,
  },
  input2: {
    marginLeft: wp('6%'),
    fontSize: wp('3%'),
    color: '#7B7B7B',
    marginTop: wp('2%'),
    backgroundColor: '#EFEFEF',
    marginRight: wp('8%'),
    borderRadius: wp('6%') / 3,
    padding: 4,
    height: hp('20%'),
  },
});
