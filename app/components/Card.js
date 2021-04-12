import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Card = ({status, dis, loc}) => {
  return (
    <View style={styles.cont}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/card-charge.png')}
          style={{height: 60, width: 60}}
        />

        <View style={{flexDirection: 'column', marginLeft: 30}}>
          <Text style={{fontSize: 16}}>PlugIn India</Text>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/tick.png')} />
            <Text style={{fontSize: 12, marginRight: 120}}>{status}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#CAEAFF',
                padding: 8,
                borderRadius: 12,
              }}>
              <Text style={{fontSize: 12}}>{dis} km</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={{fontSize: 12, marginLeft: 26, marginTop: 5}}>{loc}</Text>
      <View style={{flexDirection: 'row', margin: 10}}>
        <TouchableOpacity activeOpacity={0.4} style={{marginRight: 30}}>
          <Image source={require('../assets/navigate.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4} style={{marginLeft: 20}}>
          <Image source={require('../assets/charge_now.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    borderRadius: 25,
    borderWidth: 0.5,
    overflow: 'hidden',
    marginRight: 20,
    marginTop: 10,
    padding: 5,
  },
});

export default Card;
