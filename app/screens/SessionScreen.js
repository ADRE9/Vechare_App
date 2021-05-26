import React, { useEffect, useState } from 'react';
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
  ImageBackground,
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
  const [offset, setOffset] = useState(5);
  const [isListEnd, setIsListEnd] = useState(false);

  async function dtl() {
    // if (!loading && !isListEnd) {
    setLoading(true);
    const token = `Bearer ${await AsyncStorage.getItem('token')}`;
    fetch(`https://vecharge.app/api/v1/payment/?page=1&limit=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data.payments.length > 0) {
          //Successful response from the API Call
          setOffset(offset + 1);
          //After the response increasing the offset for the next API call.
          setdata([...value, ...responseJson.data.payments]);
          setLoading(false);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // }
  }
  useEffect(() => {
    dtl();
  }, []);

  const header = () => {
    return (
      <View>
        <ImageBackground style={styles.img}
          source={require('../assets/session.png')} >

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              marginTop: 30,
              marginLeft: 8

            }}
            onPress={() => props.navigation.goBack()}>
            <CustomBack />

          </TouchableOpacity>
        </ImageBackground>
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
        {loading ? <ActivityIndicator color="#2D9CDB" size="large" /> : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          keyExtractor={(item) => item._id.toString()}
          data={value}
          ListHeaderComponent={header}
          stickyHeaderIndices={[0]}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => (
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
    height: 180,
    width: "100%",
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
