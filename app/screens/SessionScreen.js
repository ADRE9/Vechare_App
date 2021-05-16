import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SessionCard from '../components/SessionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SessionScreen(props) {
  const [value, setdata] = useState([]);

  useEffect(() => {
    async function dtl() {
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        `https://vecharge.app/api/v1/payment/?page=2&limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      const resData = await res.json();
      setdata(resData.data.payments);
      // console.log('Carousel Recent');
    }
    dtl();
  });

  const header = () => {
    return (
      <View>
        <Image style={styles.img} source={require('../assets/session.png')} />
        <View
          style={{
            position: 'absolute',
            left: 10,
            top: 19,
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          keyExtractor={(item) => item._id.toString()}
          data={value}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => (
            <SessionCard
              loc={item.chargerId.address}
              amount={item.amount}
              energy={item.energyConsumed}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: hp('22%'),
    width: wp('100%'),
  },
});

export default SessionScreen;
