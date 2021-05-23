import React, {useCallback, memo, useRef, useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNLocation from 'react-native-location';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  const [value, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [viewLocation, isViewLocation] = useState([]);
  indexRef.current = index;

  function Pagination({index}) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {value.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const indexs = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(indexs);

    const distance = Math.abs(roundIndex - indexs);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

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
              message: 'We use your location to show where you are on the map',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });
        console.log(permission);
        location = await RNLocation.getLatestLocation({timeout: 100});
        console.log(location);
        isViewLocation(location);
      } else {
        location = await RNLocation.getLatestLocation({timeout: 100});
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
      )
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
      const resData = await res.json();
      setdata(resData.data.nearestChargers);
      console.log(
        'Location of device',
        resData.data.nearestChargers[0].location.coordinates[1],
      );
    };

    getLocation();
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s) => String(s._id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  function OpenGps({latitude, longitude}) {
    const openGps = () => {
      var scheme =
        Platform.OS === 'ios' ? 'maps://app?daddr=' : 'google.navigation:q=';
      var url = scheme + `${latitude}+${longitude}`;
      Linking.openURL(url);
    };

    return (
      <TouchableOpacity activeOpacity={0.4} onPress={openGps}>
        <Image
          source={require('../assets/navigate.png')}
          style={{
            height: hp('8%'),
            width: wp('20%'),
            borderRadius: hp('4%') / 4,
            marginTop: -wp('2%'),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        height: 195,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading === true ? (
        <LottieView
          autoPlay
          loop
          source={require('../assets/animations/loading.json')}
        />
      ) : (
        <FlatList
          data={value}
          style={styles.carousel}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          {...flatListOptimizationProps}
          renderItem={({item}) => (
            <SafeAreaView style={styles.cardContainer}>
              <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/card-charge.png')}
                    style={{height: hp('8%'), width: wp('14%')}}
                    resizeMode="contain"
                  />
                  <View style={{flexDirection: 'column', marginLeft: 30}}>
                    <Text
                      style={{
                        fontSize: wp('6%'),
                        right: wp('6%'),
                        color: 'black',
                        fontFamily: 'SF-Pro-Display-Regular',
                      }}>
                      {item._id}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../assets/tick.png')}
                        style={{
                          right: wp('6%'),
                          top: hp('0.2%'),
                          width: wp('5%'),
                          height: hp('3%'),
                        }}
                      />
                      <Text
                        style={{
                          color: '#333333',
                          fontSize: wp('3.5%'),
                          left: -wp('5%'),
                          top: hp('0.4%'),
                        }}>
                        Available
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#CAEAFF',
                          padding: wp('1.5%'),
                          borderRadius: wp('10%') / 4,
                          marginLeft: wp('20%'),
                          marginTop: -wp('1%'),
                        }}>
                        <Text style={{fontSize: wp('3%'), fontWeight: 'bold'}}>
                          {(item.distance / 1000).toFixed(2)} km
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: wp('2.6%'),
                    color: '#484848',
                    marginLeft: wp('2%'),
                    marginTop: hp('1.2%'),
                    fontFamily: 'SF-Pro-Display-Regular',
                  }}>
                  {item.address}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: wp('2%'),
                    justifyContent: 'space-evenly',
                    marginHorizontal: 40,
                    right: wp('12%'),
                  }}>
                  <OpenGps
                    latitude={item.location.coordinates[1]}
                    longitude={item.location.coordinates[0]}></OpenGps>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{left: wp('3%')}}>
                    <Image
                      source={require('../assets/charge_now.png')}
                      style={{
                        height: hp('8%'),
                        width: wp('20%'),
                        borderRadius: hp('4%') / 4,

                        marginTop: -wp('2%'),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          )}
        />
      )}

      <Pagination index={index}></Pagination>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  paginationDotActive: {backgroundColor: '#069DFF'},
  paginationDotInactive: {backgroundColor: '#DBDBDB'},

  carousel: {
    // backgroundColor: 'yellow',
    height: 180,
  },
  cardContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container: {
    borderRadius: 25,
    borderColor: '#7c7c7c',
    padding: 15,
    paddingBottom: wp('3%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    height: windowHeight * 0.2,
    width: windowWidth * 0.9,

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
