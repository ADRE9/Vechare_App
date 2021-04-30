import React from 'react';
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
import StationCard from '../components/StationCard';
import {DummyData} from '../Constants/DumyData';

function StationScreen(props) {
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
          keyExtractor={(item) => item.id.toString()}
          data={DummyData}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => (
            <StationCard status={item.status} dis={item.dis} loc={item.loc} />
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
