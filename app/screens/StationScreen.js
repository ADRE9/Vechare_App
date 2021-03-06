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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNLocation from 'react-native-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StationCard from '../components/StationCard';
import CustomBack from '../components/CustomBack';

function StationScreen({navigation}) {
  const [value, setdata] = useState([]);
  const [viewLocation, isViewLocation] = useState([]);
  const [loading, setloading] = useState(null);

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
      setloading(true);
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        `https://vecharge.app/api/v1/charger/nearestChargers`,
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
      setloading(false);
    };

    getLocation();
  }, []);

  const header = () => {
    return (
      <View>
        <ImageBackground
          style={styles.img}
          source={require('../assets/station.png')}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginLeft: 20,
              marginTop: 32,
            }}
            onPress={() => navigation.goBack()}>
            <CustomBack />
          </TouchableOpacity>
          <Text style={styles.header}>Stations Nearby</Text>
        </ImageBackground>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading === true ? (
        <ActivityIndicator size="large" color="#069DFF" />
      ) : (
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
                onPress={() => navigation.navigate('SCAN')}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: 120,
    width: '100%',
  },
  header: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    marginLeft: 80,
    fontSize: 28,
    marginTop: -32,
  },
});

export default StationScreen;
