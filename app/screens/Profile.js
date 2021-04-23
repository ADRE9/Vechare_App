/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function Profile({navigation}) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [paid, setPaid] = useState([]);
  const [amount, setAmount] = useState([]);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('You are signed out!'));
      setloggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sign = () => {
    Alert.alert('Sign Out', 'Do you wish to Sign out ?',[
      {
        text:'Yes',
        onPress:() => signOut().then(() => navigation.replace('LoginPage')),
      },
      {
        text: 'No',
        onPress:() => console.log('No'),
      }
    ])

  }

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (user) setloggedIn(true);
  }
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '792432651607-oh2kvqvrcgc94n6jfco0cg5af4csbr4l.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    async function unpaid() {
      var token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/unpaid`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const resData = await res.json();
      setPaid(resData.data.payStatus);
      setAmount(resData.data.amount);
      console.log(resData.data.payStatus);
    }
    unpaid();
  }, []);

  if (paid === false) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <ImageBackground
              style={styles.imgCont}
              source={require('../assets/profileScreen.png')}
              resizeMode="cover">
              <Text style={styles.textCont}>Moksh Garg</Text>
              <View flexDirection="column">
                <View flexDirection="row">
                  <Image
                    source={require('../assets/loc.png')}
                    style={styles.loc}
                  />
                  <Text style={styles.textCont2}>
                    Rohini/City , Delhi/State
                  </Text>
                </View>
                <Text style={styles.textCont3}>View Profile</Text>
              </View>
            </ImageBackground>
          </View>
          <View>
            <Text style={styles.imgCont2}>
              Electrify your Establishment today
            </Text>
            <Image
              source={require('../assets/profile1.png')}
              resizeMode="contain"
              style={styles.imgCont3}
            />
            <Image
              source={require('../assets/profile2.png')}
              resizeMode="contain"
              style={styles.imgCont4}
            />
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={require('../assets/img1.png')}
                style={styles.item1}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={require('../assets/img2.png')}
                style={styles.item2}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Report")}  >
              <Image
                source={require('../assets/img3.png')}
                resizeMode="contain"
                style={styles.item2}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Feed')}>
              <Image
                source={require('../assets/img4.png')}
                style={styles.item2}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={require('../assets/img5.png')}
                style={styles.item2}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={require('../assets/img6.png')}
                style={{
                  height: hp('6%'),
                  width: wp('80%'),
                  marginLeft: wp('8%'),
                  marginTop: -wp('2%'),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sign()}
              activeOpacity={0.5}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>

            <View flexDirection="row">
              <Text
                style={{
                  color: '#292929',
                  marginLeft: wp('8%'),
                  marginTop: wp('3%'),
                }}>
                Connect with us
              </Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Image
                  source={require('../assets/twitter.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('btn clicked')}>
                <Image
                  source={require('../assets/fb.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/insta.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/in.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/net.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Unpaid payment left {'\n'}₹ {amount}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('unPaid')}
              activeOpacity={0.5}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.pay}>Pay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  else{
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>
          <ImageBackground
            style={styles.imgCont}
            source={require("../assets/profileScreen.png")}
            resizeMode="cover"
          >
            <Text style={styles.textCont}>Moksh Garg</Text>
            <View flexDirection="column">
              <View flexDirection="row">
                <Image
                  source={require("../assets/loc.png")}
                  style={styles.loc}
                />
                <Text style={styles.textCont2}>Rohini/City , Delhi/State</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
                <Text style={styles.textCont3}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Text style={styles.imgCont2}>
            Electrify your Establishment today
          </Text>
          <Image
            source={require("../assets/profile1.png")}
            resizeMode="contain"
            style={styles.imgCont3}
          />
          <Image
            source={require("../assets/profile2.png")}
            resizeMode="contain"
            style={styles.imgCont4}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Work")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../assets/img1.png")}
              style={styles.item1}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Refer")}
          >
            <Image
              source={require("../assets/img2.png")}
              style={styles.item2}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Report")}
          >
            <Image
              source={require("../assets/img3.png")}
              style={styles.item2}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Feed")}
          >
            <Image
              source={require("../assets/img4.png")}
              style={styles.item2}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Rate")}
          >
            <Image
              source={require("../assets/img5.png")}
              style={styles.item2}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("About")}
          >
            <Image
              source={require("../assets/img6.png")}
              style={{
                height: hp("6%"),
                width: wp("80%"),
                marginLeft: wp("8%"),
                marginTop: -wp("2%"),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>

          <View flexDirection="row">
            <Text
              style={{
                color: "#292929",
                marginLeft: wp("8%"),
                marginTop: wp("3%"),
              }}
            >
              Connect with us
            </Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={require("../assets/twitter.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("btn clicked")}>
              <Image
                source={require("../assets/fb.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/insta.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/in.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/net.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imgCont: {
    width: wp('100%'),
    height: hp('30%'),
  },
  textCont: {
    fontSize: wp('8%'),
    color: 'white',
    fontWeight: 'bold',
    marginTop: hp('4%'),
    marginLeft: hp('4%'),
  },
  loc: {
    marginTop: hp('0.6%'),
    marginLeft: wp('6%'),
    height: hp('3%'),
    width: wp('4%'),
  },
  textCont2: {
    color: 'white',
    fontSize: wp('4%'),
    marginLeft: wp('3%'),
    marginTop: wp('1%'),
  },
  textCont3: {
    marginLeft: wp('8%'),
    marginTop: wp('3%'),
    fontSize: wp('4%'),
    color: 'white',
    textDecorationLine: 'underline',
  },
  imgCont2: {
    fontSize: wp('4%'),
    color: '#292929',
    marginTop: -wp('13%'),
    marginLeft: wp('8%'),
    fontWeight: 'bold',
  },
  imgCont3: {
    height: hp('8%'),
    width: wp('80%'),
    marginLeft: wp('4%'),
  },
  imgCont4: {
    height: hp('8%'),
    width: wp('80%'),
    marginLeft: wp('4%'),
  },
  item1: {
    height: hp('6%'),
    width: wp('80%'),
    marginLeft: wp('8%'),
    marginTop: wp('2%'),
  },
  item2: {
    height: hp('6%'),
    width: wp('80%'),
    marginLeft: wp('8%'),
    marginTop: -wp('2%'),

  },
  icon: {
    height: hp('4%'),
    width: wp('6%'),
    marginLeft: wp('4%'),
    marginTop: wp('2%'),
  },
  logout: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: wp('5%'),
    height: hp('5%'),
    width: wp('40%'),
    padding: 6,
    borderRadius: wp('8%') / 4,
    backgroundColor: '#069DFF',
    marginTop: wp('3%'),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  pay: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: wp('5%'),
    height: hp('5%'),
    width: wp('40%'),
    padding: 6,
    borderRadius: wp('8%') / 4,
    backgroundColor: '#069DFF',
    marginTop: wp('3%'),
  },
});

export default Profile;
