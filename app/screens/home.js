import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../components/Card';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const details = [
  {
    id: '1',
    status: 'Available',
    dis: '1.3',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
  {
    id: '2',
    status: 'Available',
    dis: '12.4',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
  {
    id: '3',
    status: 'Available',
    dis: '1.3',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
];

export default function home({navigation}) {
  // const [paid, setPaid] = useState([]);
  // const [amount, setAmount] = useState([]);
  // const [name, setName] = useState([]);

  // useEffect(() => {
  //   async function unpaid() {
  //     var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const res = await fetch(
  //       `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/payment/unpaid`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     const resData = await res.json();
  //     setPaid(resData.data.payStatus);
  //     setAmount(resData.data.amount);

  //     console.log(resData.data.payStatus);
  //   }
  //   unpaid();
  // }, []);

  // useEffect(() => {
  //   async function connection() {
  //     var token = `Bearer ${await AsyncStorage.getItem('token')}`;
  //     const res = await fetch(
  //       `http://ec2-52-66-132-134.ap-south-1.compute.amazonaws.com/users/me`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     const resData = await res.json();
  //     setName(resData.data.name);
  //   }
  //   connection();
  // }, []);

  // if (paid === false) {
  //   return (
  //     <View>
  //       <Text>hello</Text>
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/chargeScreen.png')}
            style={{width: '100%', height: 150}}
            resizeMode="cover">
            <View style={styles.headingName}>
              <Text style={styles.name}>Hello ,</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.search}>
          <Searchbar
            placeholder="Search for Charging Ports"
            iconColor="#D2D2D2"
            style={{borderRadius: 25}}
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={require('../assets/host.png')} style={styles.host} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.charging}>Charging Points Near Me</Text>
          <ScrollView>
            <FlatList
              data={details}
              keyExtractor={(value) => value.id}
              horizontal={true}
              renderItem={({item}) => (
                <Card status={item.status} dis={item.dis} loc={item.loc} />
              )}
            />
          </ScrollView>
        </View>
        <View>
          <Text style={styles.recent}>Recent Sessions</Text>
          <ScrollView>
            <FlatList
              data={details}
              keyExtractor={(value) => value.id}
              horizontal={true}
              renderItem={({item}) => (
                <Card status={item.status} dis={item.dis} loc={item.loc} />
              )}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  headingName: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: 'white',
    marginLeft: -180,
    marginBottom: 80,
    fontWeight: 'bold',
  },
  search: {
    marginTop: -40,
    marginLeft: 10,
    marginRight: 10,
  },
  host: {
    width: '70%',
    height: 80,
    marginLeft: 60,
    marginTop: 20,
  },
  charging: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
    marginLeft: 30,
  },
  recent: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 30,
    marginTop: 20,
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
