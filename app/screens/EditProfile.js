import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import CustomBack from '../components/CustomBack';
import {EditHeader, Pencil, SaveBtn, Loc} from 'svg';

function EditProfile({navigation}) {
  const [name, setName] = useState([]);
  const [mail, setMail] = useState([]);
  const [userName, setuserName] = useState([]);
  const [userPhone, setuserPhone] = useState([]);
  const [newName, setnewName] = useState([]);
  const [newPhone, setnewPhone] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const details = async () => {
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    let config = {
      headers: {
        Authorization: token,
      },
    };

    const data = {
      number: userPhone,
      username: userName,
    };
    await axios
      .patch('https://vecharge.app/api/v1/users/me', data, config)
      .catch((error) => alert(error))
      .then(() => alert('Details submitted Successfully'))
      .finally(() => navigation.goBack());
  };
  useEffect(() => {
    async function value() {
      const user = await AsyncStorage.getItem('name');
      const mailid = await AsyncStorage.getItem('mail');
      setName(user);
      setMail(mailid);
    }
    const _getCurrentUserInfo = async () => {
      try {
        let info = await GoogleSignin.signInSilently();
        // console.log('User Info --> ', info);
        setUserInfo(info.user.photo);
        // console.log(info.user.photo);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          alert('User has not signed in yet');
          console.log('User has not signed in yet');
        } else {
          alert("Unable to get user's info");
          console.log("Unable to get user's info");
        }
      }
    };
    value();
    _getCurrentUserInfo();
    console.log('edit profile SCreen');
  }, []);

  // useEffect(() => {
  //   async function value() {
  //     const token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     let config = {
  //       headers: {
  //         Authorization: token,
  //       },
  //     };
  //     await axios
  //       .patch('https://vecharge.app/api/v1/users/me', config)
  //       .catch((error) => alert(error))
  //       .then((response) => {
  //         setnewName(response.data.data.username),
  //           setnewPhone(response.data.data.number);
  //         console.log(
  //           'the user details were updated',
  //           response.data.data.username + ' ' + response.data.data.number,
  //         );
  //       })
  //       .then(() => alert('Details submitted Successfully'))
  //       .finally(() => navigation.goBack());
  //   }
  //   value();
  // });
  return (
    <ScrollView style={styles.cont}>
      <SafeAreaView style={styles.cont}>
        <EditHeader height={hp('40%')} width={wp('100%')} />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <CustomBack />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('pressed avatar')}
          style={styles.avatar}>
          <Image
            source={{uri: userInfo}}
            style={{
              height: hp('10%'),
              width: wp('18%'),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('pressed edit')}
          style={styles.pencil}>
          <Pencil height={hp('4%')} width={wp('8%')} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <View flexDirection="row" style={styles.cont4}>
          <Loc
            position={'absolute'}
            height={hp('4%')}
            width={wp('4%')}
            top={4}
            left={-5}
          />
          <Text style={styles.textCont2}>Rohini/City , Delhi/State</Text>
        </View>

        <View style={styles.cont1}>
          <Text style={styles.txt}>Mobile Number</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
              placeholder="Enter Phone"
              onChangeText={(text) => setuserPhone(text)}
              defaultValue={newPhone}
            />

            {/* <Text style={styles.change}>CHANGE</Text> */}
          </View>
        </View>
        <View style={styles.cont2}>
          <Text style={styles.txt}>Email Address</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              defaultValue={mail}
            />
          </View>
        </View>
        <View style={styles.cont2}>
          <Text style={styles.txt}>Full Name</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setuserName(text)}
              defaultValue={newName}
            />
          </View>
        </View>
        {/* <View style={styles.cont2}>
          <Text style={styles.txt}>Location</Text>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              placeholder="Add Address"
              placeholderTextColor="#7B7B7B"
              multiline={true}
              defaultValue={userName}
            />
          </View>
        </View> */}
        <TouchableOpacity
          style={{
            marginLeft: wp('10%'),
            marginTop: wp('7%'),
            height: hp('5%'),
            width: wp('30%'),
          }}
          onPress={details}
          activeOpacity={0.5}>
          <SaveBtn height={hp('5%')} width={wp('30%')} />
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
  name: {
    fontSize: wp('6%'),
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    position: 'absolute',
    top: 100,
    left: 120,
  },
  cont1: {
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    marginTop: -wp('10%'),
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
    fontSize: wp('3.2%'),
    marginLeft: wp('4%'),
    marginTop: wp('2.6%'),
    fontFamily: 'SF-Pro-Text-Semibold',
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
    fontSize: 13,
    color: '#626262',
    fontFamily: 'OpenSans-Regular',
  },
  inputCont: {
    backgroundColor: '#ECECEC',
    borderRadius: wp('8%') / 6,
    flexDirection: 'row',
    marginTop: wp('1%'),
    fontFamily: 'OpenSans-Regular',
  },
  input: {
    color: '#242424',
    padding: wp('0.1%'),
    height: hp('5%'),
    marginTop: wp('1.5%'),
    marginLeft: wp('3%'),
    fontSize: 14,
  },
  change: {
    color: '#069DFF',
    padding: wp('2%'),
    position: 'absolute',
    left: wp('60%'),
    top: hp('1%'),

    fontFamily: 'OpenSans-SemiBold',
  },
});

export default EditProfile;
