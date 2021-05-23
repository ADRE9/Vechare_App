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
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StationCard from '../components/StationCard';

function StationScreen(props) {
  const [value, setdata] = useState([]);
  const [viewLocation, isViewLocation] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
        },
      });

      console.log(permission);

      let location;
      if (!permission) {
        permission = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
            rationale: {
              title: 'We need to access your location',
              message:
                'We use your location to show where are the nearest Charger points Located',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });
        console.log(permission);
        location = await RNLocation.getLatestLocation({timeout: 2000});
        console.log(location);
        isViewLocation(location);
      } else {
        location = await RNLocation.getLatestLocation({timeout: 2000});
        console.log(location);
        isViewLocation(location);
      }
      const lat = location.latitude;
      const long = location.longitude;
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        `https://vecharge.app/api/v1/charger/nearestChargers/?page=1&limit=3`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            isActive: true,
            coordinates: [long, lat],
          }),
        },
      );
      const resData = await res.json();
      setdata(resData.data.nearestChargers);
    };

    getLocation();
  }, []);
  const header = () => {
    return (
      <View>
        <Image style={styles.img} source={require('../assets/stations.png')} />
        <View
          style={{
            position: 'absolute',
            left: 15,
            top: 20,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            // style={{backgroundColor: 'yellow'}}
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
          keyExtractor={(item) => item._id}
          data={value}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => (
            <StationCard
              dis={(item.distance / 1000).toFixed(2)}
              loc={item.address}
              device={item._id}
              lat={item.location.coordinates[1]}
              long={item.location.coordinates[0]}
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
    height: hp('16%'),
    width: wp('100%'),
  },
});

export default StationScreen;
