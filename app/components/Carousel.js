import React, { useCallback, memo, useRef, useState } from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// const details = Array.from({ length: 3 }).map((_, i) => {
//   return {
//     id: i,
//     image: `https://picsum.photos/1440/2842?random=${i}`,
//     title: `This is the title ${i + 1}!`,
//     subtitle: `This is the subtitle ${i + 1}!`,
//   };
// });

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
    loc: 'Rohini Community Charging Station,..',
  },
];

const Slide = memo(function Slide({ data }) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/card-charge.png')}
            style={{ height: hp('8%'), width: wp('14%') }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'column', marginLeft: 30 }}>
            <Text
              style={{
                fontSize: wp('6%'),
                right: wp('6%'),
                color: 'black',
                fontFamily: 'SF-Pro-Display-Regular',
              }}>
              PlugIn India
            </Text>
            <View style={{ flexDirection: 'row' }}>
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
                {data.status}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#CAEAFF',
                  padding: wp('1.5%'),
                  borderRadius: wp('10%') / 4,
                  marginLeft: wp('24%'),
                  marginTop: -wp('1%'),
                }}>
                <Text style={{ fontSize: wp('3%'), fontWeight: 'bold' }}>
                  {data.dis} km
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
          {data.loc}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            margin: wp('2%'),
            justifyContent: 'space-evenly',
            marginHorizontal: 40,
            right: wp('12%'),
          }}>
          <TouchableOpacity activeOpacity={0.4}>
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
          <TouchableOpacity activeOpacity={0.4} style={{ left: wp('3%') }}>
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
  );
});

function Pagination({ index }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {details.map((_, i) => {
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

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((s) => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      <FlatList
        data={details}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}

const styles = StyleSheet.create({
  pagination: {
    bottom: windowHeight * 0.01,
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
  paginationDotActive: { backgroundColor: '#069DFF' },
  paginationDotInactive: { backgroundColor: '#DBDBDB' },

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
