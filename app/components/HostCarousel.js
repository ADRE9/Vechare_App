import React, {useCallback, memo, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

// const slideList = Array.from({length: 3}).map((_, i) => {
//   return {
//     id: i,
//     image: `https://picsum.photos/1440/2842?random=${i}`,
//     title: `This is the title ${i + 1}!`,
//     subtitle: `This is the subtitle ${i + 1}!`,
//   };
// });

const slideList = [
  {
    id: 1,
    title: 'Host multiple charging points',
    subtitle:
      'Increase footfall to your establishment by enabling EV charging.We provide free installation veCharge point.',
    image: require('../assets/host1.png'),
  },
  {
    id: 2,
    title: 'Host and earn income',
    subtitle:
      'Earn additional income by setting up your own prices for the charging. Withdraw the money to your account easily. We will also provide branding for your brand in future.',
    image: require('../assets/host2.png'),
  },
  {
    id: 3,
    title: 'Complete automated solution',
    subtitle:
      'Monitor and analyze the charging status of all your devices in realtime via veCharge dashboard. The device is a zero maintenance product requiring no human intervention.',
    image: require('../assets/host3.png'),
  },
];

const Slide = memo(function Slide({data}) {
  return (
    <SafeAreaView style={styles.slide}>
      <View style={styles.container}>
        <Image source={data.image} style={styles.slideImage} />
      </View>
      <View style={{padding: 15, paddingHorizontal: 25}}>
        <Text style={styles.slideTitle}>{data.title}</Text>
        <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
      </View>
    </SafeAreaView>
  );
});

function Pagination({index}) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
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

export default function HostCarousel() {
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
    <View
      style={{
        height: 430,
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <FlatList
        data={slideList}
        // style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />

      <Pagination index={index}></Pagination>
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    borderColor: '#7c7c7c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    height: hp('27%'),
    width: wp('87%'),
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
  slideImage: {width: 190, height: 158},
  slideTitle: {
    fontSize: windowWidth > 350 ? 16 : 12,
    marginTop: hp('6%'),
    fontFamily: 'SF-Pro-Text-Semibold',
    color: '#0D0D0D',
  },
  slideSubtitle: {
    fontSize: windowWidth > 350 ? 13 : 10,
    marginTop: hp('0.5%'),
    fontFamily: 'SF-Pro-Text-Regular',
    color: '#373737',
  },

  pagination: {
    position: 'absolute',
    marginTop: 220,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginTop: 15,
  },
  paginationDotActive: {backgroundColor: '#069DFF'},
  paginationDotInactive: {backgroundColor: '#DBDBDB'},
});
