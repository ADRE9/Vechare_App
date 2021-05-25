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
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SessionCard from '../components/SessionCard';
import CustomBack from '../components/CustomBack';

function SessionScreen(props) {
  const [loading, setLoading] = useState(true);
  const [value, setdata] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  async function dtl() {
    setLoading(true);
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const res = await fetch(`https://vecharge.app/api/v1/payment/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));

    const resData = await res.json();
    setdata(resData.data.payments);
  }
  useEffect(() => {
    dtl();
  }, []);

  const header = () => {
    return (
      <View>
        <Image style={styles.img} source={require('../assets/session.png')} />

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            position: 'absolute',
            left: 12,
            top: 20,
          }}
          onPress={() => props.navigation.goBack()}>
          <CustomBack />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={dtl}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? <ActivityIndicator color="#2D9CDB" size="large" /> : null}
        </TouchableOpacity> */}
        {loading === true ? (
          <ActivityIndicator color="#2D9CDB" size="large" />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={value}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          ListFooterComponent={renderFooter}
          renderItem={({item}) => (
            <SessionCard
              device={item.chargerId._id}
              loc={item.chargerId.address}
              amount={item.amount}
              energy={item.energyConsumed}
              days={item.createdAt}
              lat={item.chargerId.location.coordinates[1]}
              long={item.chargerId.location.coordinates[0]}
            />
          )}
          onEndReached={dtl}
          onEndReachedThreshold={0.5}
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
  footer: {
    // padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SessionScreen;
