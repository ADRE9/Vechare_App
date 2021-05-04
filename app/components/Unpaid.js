import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Unpaid = ({amount, onPress}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/unpaidscreen.png')}
        style={{width: wp('100%'), height: hp('94%')}}
        resizeMode="cover"
      />
      <Text style={styles.txt}>₹ {amount}</Text>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Image
          source={require('../assets/unpayment.png')}
          style={{
            height: hp('5.5%'),
            width: wp('35%'),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  btn: {
    position: 'absolute',
    marginTop: 346,
    marginLeft: 15,
  },
  txt: {
    position: 'absolute',
    marginTop: 276,
    marginLeft: 20,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Unpaid;
