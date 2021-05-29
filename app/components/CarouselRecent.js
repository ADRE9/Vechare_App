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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import moment from 'moment';

import {Navigate, ChargeNow, Tick} from 'svg';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

console.log('CarouselRecent');

export default function CarouselRecent({props}) {
  const [index, setIndex] = useState(0);
  const [value, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const indexRef = useRef(index);
  indexRef.current = index;

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

  useEffect(() => {
    async function dtl() {
      const token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const res = await fetch(
        `https://vecharge.app/api/v1/payment/?page=1&limit=3`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
      const resData = await res.json();
      // if (resData.data.payments === []) {
      //   setdata({
      //     _id: '1',
      //     amount: 'No amount',
      //     energyConsumed: '0',
      //   });
      // } else {
      //   setdata(resData.data.payments);
      // }
      setdata(resData.data.payments);

      // console.log('Carousel Recent payments check', resData.data.payments);
    }
    dtl();
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

  // function DateCh({tm}) {
  //   return moment(tm, 'YYYYMMDD hhmmss').fromNow();
  // }

  function DateCh({tm}) {
    return moment(tm).startOf('minutes').fromNow();
  }
  function OpenGps({latitude, longitude}) {
    const openGps = () => {
      var scheme =
        Platform.OS === 'ios' ? 'maps://app?daddr=' : 'google.navigation:q=';
      var url = scheme + `${latitude}+${longitude}`;
      Linking.openURL(url);
    };

    return (
      <TouchableOpacity activeOpacity={0.4} onPress={openGps}>
        <Navigate
          height={hp('8%')}
          width={wp('26%')}
          borderRadius={hp('4%') / 4}
          marginTop={-wp('2%')}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        height: 200,
        paddingTop: 5,
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
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.heading}>{item.chargerId._id}</Text>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', marginTop: wp('2%')}}>
                        <Tick height={hp('3%')} width={wp('5%')} />
                        <Text style={styles.status}>Available</Text>
                      </View>
                      <Text style={styles.loc}>{item.chargerId.address} </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subtitle}>
                        {'\u20B9'} {item.amount}
                      </Text>
                      <Text style={styles.subtitle2}>
                        {item.energyConsumed} kwh
                      </Text>
                    </View>
                    <Text style={styles.txt}>
                      Last Charged: <DateCh tm={item.createdAt}></DateCh>
                    </Text>
                    <Text style={styles.txt2}>
                      Operator: veCharge Community
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: wp('2%'),
                    justifyContent: 'space-evenly',
                    right: wp('12%'),
                    marginHorizontal: 40,
                  }}>
                  <OpenGps
                    latitude={item.chargerId.location.coordinates[1]}
                    longitude={
                      item.chargerId.location.coordinates[0]
                    }></OpenGps>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => props.navigation.jumpTo('QrScreen')}
                    style={{left: wp('3%')}}>
                    <ChargeNow
                      height={hp('8%')}
                      width={wp('26%')}
                      borderRadius={hp('4%') / 4}
                      marginTop={-wp('2%')}
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

  cardContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    borderColor: '#7c7c7c',
    // borderWidth: 0.3,
    paddingLeft: wp('4%'),
    paddingTop: wp('3%'),
    padding: 25,
    paddingBottom: wp('5%'),
    marginRight: wp('9%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    height: hp('22%'),
    width: wp('87%'),
    left: wp('3%'),
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
  heading: {
    fontFamily: 'SF-Pro-Display-Medium',
    color: 'black',
    fontSize: wp('5.6%'),
    marginTop: wp('1%'),
  },
  status: {
    color: '#333333',
    fontFamily: 'OpenSans-Regular',
  },
  loc: {
    color: '#484848',
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: wp('2.5%'),
    marginTop: wp('10%'),
    // marginRight: wp('38%'),
    position: 'absolute',
  },
  subtitle: {
    backgroundColor: '#00A2FD',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: wp('21%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: wp('6%'),
    marginRight: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle2: {
    backgroundColor: '#05C07D',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: -wp('6%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: wp('6%'),
    justifyContent: 'center',
  },
  txt: {
    marginTop: wp('3%'),
    marginLeft: wp('22%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
  txt2: {
    marginTop: wp('2%'),
    marginLeft: wp('22%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
});
