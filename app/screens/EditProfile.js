import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function EditProfile({navigation}) {
  return (
    <ScrollView style={styles.cont}>
      <SafeAreaView style={styles.cont}>
        <Image
          resizeMode="cover"
          style={styles.background}
          source={require('../assets/edit.png')}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack('Profile')}
          style={styles.backBtn}>
          <Image
            source={require('../assets/Back.png')}
            style={{height: hp('4%'), width: wp('10%')}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('pressed avatar')}
          style={styles.avatar}>
          <Image
            source={require('../assets/avatar.png')}
            style={{height: hp('8%'), width: wp('15%')}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('pressed edit')}
          style={styles.pencil}>
          <Image
            source={require('../assets/pencil.png')}
            style={{height: hp('4%'), width: wp('8%')}}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Moksh Garg</Text>
        <View flexDirection="row" style={styles.cont4}>
          <Image source={require('../assets/loc.png')} style={styles.loc} />
          <Text style={styles.textCont2}>Rohini/City , Delhi/State</Text>
        </View>

        <View style={styles.cont1}>
          <Text style={styles.txt}>Mobile Number</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}>
              9711898182
            </TextInput>
            <Text style={styles.change}>CHANGE</Text>
          </View>
        </View>
        <View style={styles.cont2}>
          <Text style={styles.txt}>Email Address</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address">
              Mokshgarg003@gmail.com
            </TextInput>
          </View>
        </View>
        <View style={styles.cont2}>
          <Text style={styles.txt}>Full Name</Text>
          <View style={styles.inputCont}>
            <TextInput style={styles.input}>Moksh Garg</TextInput>
          </View>
        </View>
        <View style={styles.cont2}>
          <Text style={styles.txt}>Location</Text>
          <View style={styles.inputCont}>
            <TextInput style={styles.input} placeholder="Add Address" />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <Image style={styles.btn} source={require('../assets/sendBtn.png')} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    height: hp('30%'),
    width: wp('100%'),
  },
  name: {
    fontSize: wp('6%'),
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 110,
    left: 120,
    letterSpacing: hp('0.5%'),
  },
  cont1: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    marginTop: -wp('4%'),
  },
  cont2: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    marginTop: wp('4%'),
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 15,
  },
  textCont2: {
    color: 'white',
    fontSize: wp('3.5%'),
    marginLeft: wp('3%'),
    marginTop: wp('1%'),
  },

  loc: {
    position: 'absolute',
    height: hp('2%'),
    width: wp('2.8%'),
    top: 8,
    left: -5,
  },
  cont3: {
    position: 'absolute',
    top: 135,
    left: 100,
  },
  cont4: {
    position: 'absolute',
    top: 135,
    left: 120,
  },
  avatar: {
    position: 'absolute',
    top: 30,
    left: 150,
  },
  pencil: {
    position: 'absolute',
    top: 30,
    left: 320,
  },
  txt: {
    color: '#626262',
  },
  inputCont: {
    backgroundColor: '#ECECEC',
    borderRadius: wp('8%') / 6,
    flexDirection: 'row',
    marginTop: wp('2%'),
  },
  input: {
    color: '#242424',
    padding: wp('2%'),
    marginTop: wp('1.5%'),
    marginLeft: wp('3%'),
  },
  change: {
    color: '#069DFF',
    padding: wp('2%'),
    marginLeft: wp('30%'),
    marginTop: wp('1.5%'),
  },
  btn: {
    height: hp('5%'),
    width: wp('30%'),
    marginLeft: wp('10%'),
    marginTop: wp('7%'),
  },
});

export default EditProfile;
