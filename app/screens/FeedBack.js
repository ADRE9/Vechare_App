import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

export default function FeedBack({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [number, setNumber] = useState({value: '', error: ''});
  const [mail, setMail] = useState({value: '', error: ''});
  const [msg, setMsg] = useState({value: '', error: ''});
  const [loading, setLoading] = useState();

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
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
            We are always working to improve the veCharge experience. We would
            love to hear what we are doing right and how we can make our service
            better.
            {'\n'}
            {'\n'}
            You can make any suggestion, report a bug, give product review or
            write anything you’d like to tell us.
          </Text>

          {/* <Text style={styles.name}>Name</Text> */}
          {/* <TextInput style={styles.input} placeholder="Enter Name" /> */}
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({value: text, error: ''})}
            error={!!name.error}
            errorText={name.error}
            placeholder={'Name of user'}
            style={styles.input}
            mode="flat"
          />
          {/* <Text style={styles.name}>Contact</Text> */}
          <TextInput
            label="Contact"
            returnKeyType="next"
            value={number.value}
            onChangeText={(text) => setNumber({value: text, error: ''})}
            error={!!number.error}
            errorText={number.error}
            placeholder={'Enter Phone Number'}
            style={styles.input}
            mode="flat"
          />

          {/* <Text style={styles.name}>Email Address</Text> */}
          <TextInput
            label="Email Address"
            returnKeyType="next"
            value={mail.value}
            onChangeText={(text) => setMail({value: text, error: ''})}
            error={!!mail.error}
            errorText={mail.error}
            placeholder={'Enter Email Address'}
            style={styles.input}
            mode="flat"
          />

          {/* <Text style={styles.name}>Enter Message</Text> */}
          <TextInput
            label="Enter Message"
            returnKeyType="next"
            value={msg.value}
            onChangeText={(text) => setMsg({value: text, error: ''})}
            error={!!msg.error}
            errorText={msg.error}
            style={styles.input2}
            multiline={true}
            numberOfLines={6}
            mode="flat"
          />

          {/* <Image
            source={require('../assets/submitBtn.png')}
            resizeMode="contain"
            style={{
              height: hp('5%'),
              width: wp('40%'),
              marginLeft: wp('1%'),
              marginTop: wp('5%'),
            }}
          /> */}
          <Button
            loading={loading}
            mode="contained"
            uppercase={false}
            style={{
              marginTop: 24,
              backgroundColor: '#069DFF',
              width: '30%',
              height: 40,
              paddingVertical: 1,
              bottom: 12,
              marginLeft: wp('8%'),
            }}>
            Submit
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: wp('7%'),
    color: '#000000',
    marginTop: wp('6%'),
    marginLeft: wp('6%'),
    fontFamily: 'SF-Pro-Display-Bold',
  },
  subtitle: {
    fontSize: wp('3.3%'),
    color: '#000000',
    marginTop: wp('4%'),
    marginRight: wp('6%'),
    marginLeft: wp('6%'),
    lineHeight: wp('4%'),
    fontFamily: 'SF-Pro-Display-Regular',
    paddingBottom: 15,
  },
  name: {
    marginLeft: wp('6%'),
    fontSize: wp('3%'),
    color: '#000000',
    marginTop: wp('4%'),
  },
  input: {
    marginLeft: wp('6%'),
    fontSize: wp('3.5%'),
    color: '#7B7B7B',
    backgroundColor: '#EFEFEF',
    width: '100%',
  },
  input2: {
    marginLeft: wp('6%'),
    fontSize: wp('3.5%'),
    color: '#7B7B7B',
    backgroundColor: '#EFEFEF',
    borderRadius: wp('6%') / 3,
    width: '100%',
  },
});
