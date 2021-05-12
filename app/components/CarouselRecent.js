import React, {useCallback, memo, useRef, useState} from 'react';
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
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

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
    days: '3',
    dis: '1.3',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
  {
    id: '2',
    days: '3',
    dis: '12.4',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
  {
    id: '3',
    days: '3',
    dis: '1.3',
    loc: 'Rohini Community Charging Station, B-5/30, 2nd Floor, Delhi',
  },
];

const Slide = memo(function Slide({data}) {
  return (
    <SafeAreaView style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>PlugIn India</Text>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', marginTop: wp('2%')}}>
                <Image source={require('../assets/tick.png')} />
                <Text style={styles.status}>Available</Text>
              </View>
              <Text style={styles.loc}>{data.loc}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.subtitle}>{'\u20B9'} 500</Text>
              <Text style={styles.subtitle2}>7.4 kwh</Text>
            </View>
            <Text style={styles.txt}>Last Charged: {data.days} days ago</Text>
            <Text style={styles.txt2}>Operator: veCharge Community</Text>
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
          <TouchableOpacity activeOpacity={0.4}>
            <Image
              source={require('../assets/navigate.png')}
              style={{
                height: hp('8%'),
                width: wp('22%'),
                borderRadius: hp('4%') / 4,
                marginTop: -wp('2%'),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.4} style={{left: wp('3%')}}>
            <Image
              source={require('../assets/charge_now.png')}
              style={{
                height: hp('8%'),
                width: wp('23%'),
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

function Pagination({index}) {
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

export default function CarouselRecent() {
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

  const renderItem = useCallback(function renderItem({item}) {
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
  paginationDotActive: {backgroundColor: '#069DFF'},
  paginationDotInactive: {backgroundColor: '#DBDBDB'},

  carousel: {
    // backgroundColor: 'yellow',
    height: 190,
  },
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
    marginTop: hp('2%'),
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
    marginTop: wp('3%'),
    marginRight: wp('38%'),
  },
  subtitle: {
    backgroundColor: '#00A2FD',
    height: hp('3%'),
    width: wp('16%'),
    color: '#FFFFFF',
    marginLeft: -wp('32%'),
    borderRadius: wp('12%') / 4,
    padding: 3,
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: wp('6%'),
    marginRight: wp('10%'),
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
  },
  txt: {
    marginTop: wp('3%'),
    marginLeft: -wp('30%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
  txt2: {
    marginTop: wp('2%'),
    marginLeft: -wp('32%'),
    color: 'black',
    fontFamily: 'SF-Pro-Display-Medium',
    fontSize: wp('2.6%'),
  },
});
