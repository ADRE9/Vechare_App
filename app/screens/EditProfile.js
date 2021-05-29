import React, { useEffect, useState } from 'react';
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
  Dimensions
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
import { EditHeader, Pencil, SaveBtn, Loc } from 'svg';

const Width = Dimensions.get('window').width;

function EditProfile({ navigation }) {
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
        {/* <EditHeader height={hp('40%')} width={wp('100%')} /> */}
        <ImageBackground source={require("../assets/edit.png")}
          style={{
            height: 250,
            width: wp("100%")
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <CustomBack />
          </TouchableOpacity>

          <Image
            source={{ uri: userInfo }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              marginLeft: 160,
              marginTop: -20,

            }}
          />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.name}>{name}</Text>
          </View>


        </ImageBackground>

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
            marginLeft: 40,
            marginTop: 50,

          }}
          onPress={details}
          activeOpacity={0.5}>
          <SaveBtn width={110} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    marginTop: 10,
  },
  cont1: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: -8,
  },
  cont2: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
  },
  backBtn: {
    marginLeft: 20,
    marginTop: 32,
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
  // avatar: {
  //   marginLeft: Width / 3,
  // },

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
