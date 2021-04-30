import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Recent from './Recent';

const {width, height} = Dimensions.get('window');

function CarouselRecent({data}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  //   const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const size = width * 0.9;

  return (
    <View style={{overflow: 'hidden'}}>
      <View
        style={{
          // backgroundColor: 'red',
          padding: hp('1%'),
        }}>
        <FlatList
          data={data}
          keyExtractor={(data) => data.id}
          horizontal
          bounces={false}
          pagingEnabled
          scrollEnabled
          snapToInterval={size}
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Recent days={item.days} dis={item.dis} loc={item.loc} />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
      </View>
      <View style={styles.pagination}>
        {data.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                borderRadius: wp('7%') / 2,
                width: wp('1.5%'),
                height: hp('1%'),
                backgroundColor: '#069DFF',
                marginLeft: wp('2%'),
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    right: wp('2%'),
  },
});

export default CarouselRecent;
