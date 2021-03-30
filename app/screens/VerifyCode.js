/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function VerifyCode(props) {
  const [number, setNumber] = useState('');
  const [confirm, setConfirm] = useState(null);

  const OtpVerify = async () => {
    try {
      let data = await confirm.confirm(number);
      setConfirm(null);
      console.log('data', data);
    } catch (error) {
      // console.log('Invalid code.');
      ToastAndroid.show('Invalid code.', ToastAndroid.SHORT);
    }
  };
  // auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // });

  // if (authenticated) {
  //   return <QRScreen />;
  // }

  return (
    <View
      style={{
        height: height,
        width: '100%',
        flex: 1,
        marginTop: 60,
      }}>
      <Image
        source={require('../assets/login.png')}
        style={{width: 300, height: 300, marginLeft: 40, marginBottom: 40}}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: 40,
          marginTop: 7,
          alignItems: 'center',
          marginHorizontal: 5,
        }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 20,
          marginTop: 25,
          marginBottom: 15,
        }}>
        Enter your 6-digit code
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <TextInput
          style={{
            marginBottom: 20,
            color: 'black',
            width: '100%',
            borderBottomColor: '#f8f8f8',
            borderBottomWidth: 1,
          }}
          placeholder="Enter 6 digit OTP"
          placeholderTextColor="#fff"
          underlineColorAndroid={'transparent'}
          keyboardType="number-pad"
          onChangeText={(value) => setNumber(value)}
          value={number}
          maxLength={6}
        />
        <TouchableOpacity
          onPress={() =>
            OtpVerify().then(() => props.navigation.replace('RegisterPage'))
          }
          disabled={number.length === 6 ? false : true}
          style={[
            styles.listView,
            {backgroundColor: number.length === 6 ? '#000' : 'grey'},
          ]}>
          <Text
            style={{
              color: 'seashell',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 25,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
}

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  listView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  fbButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4267B2',
    borderRadius: 5,
    color: 'white',
    padding: 11,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
    padding: 11,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hairline: {
    backgroundColor: '#A2A2A2',
    height: 0.5,
    width: '40%',
    marginTop: 19,
  },

  lineLowText1: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 15,
    color: '#A2A2A2',
    width: '20%',
    textAlign: 'center',
    marginTop: 7,
  },
});
// import React, {useState} from 'react';
// import {
//   Animated,
//   Image,
//   SafeAreaView,
//   Text,
//   View,
//   ToastAndroid,
// } from 'react-native';

// import {
//   CodeField,
//   Cursor,
//   useBlurOnFulfill,
//   useClearByFocusCell,
// } from 'react-native-confirmation-code-field';

// import styles, {
//   ACTIVE_CELL_BG_COLOR,
//   CELL_BORDER_RADIUS,
//   CELL_SIZE,
//   DEFAULT_CELL_BG_COLOR,
//   NOT_EMPTY_CELL_BG_COLOR,
// } from '../components/Style';

// const {Value, Text: AnimatedText} = Animated;

// const CELL_COUNT = 4;

// const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
// const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
// const animateCell = ({hasValue, index, isFocused}) => {
//   Animated.parallel([
//     Animated.timing(animationsColor[index], {
//       useNativeDriver: false,
//       toValue: isFocused ? 1 : 0,
//       duration: 250,
//     }),
//     Animated.spring(animationsScale[index], {
//       useNativeDriver: false,
//       toValue: hasValue ? 0 : 1,
//       duration: hasValue ? 300 : 250,
//     }),
//   ]).start();
// };

// const VerifyCode = () => {
//   const [number, setNumber] = useState('');
//   const [confirm, setConfirm] = useState(null);

//   const OtpVerify = async () => {
//     try {
//       await confirm.confirm(number);
//     } catch (error) {
//       ToastAndroid.show('Valid code.', ToastAndroid.SHORT);
//     }
//   };
//   const [value, setValue] = useState('');
//   const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   const renderCell = ({index, symbol, isFocused}) => {
//     const hasValue = Boolean(symbol);
//     const animatedCellStyle = {
//       backgroundColor: hasValue
//         ? animationsScale[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
//           })
//         : animationsColor[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
//           }),
//       borderRadius: animationsScale[index].interpolate({
//         inputRange: [0, 1],
//         outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
//       }),
//       transform: [
//         {
//           scale: animationsScale[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: [0.2, 1],
//           }),
//         },
//       ],
//     };

//     // Run animation on next event loop tik
//     // Because we need first return new style prop and then animate this value
//     setTimeout(() => {
//       animateCell({hasValue, index, isFocused});
//     }, 0);

//     return (
//       <AnimatedText
//         key={index}
//         style={[styles.cell, animatedCellStyle]}
//         onLayout={getCellOnLayoutHandler(index)}>
//         {symbol || (isFocused ? <Cursor /> : null)}
//       </AnimatedText>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <Text style={styles.title}>Verification</Text>
//       <Image
//         source={require('../assets/login.png')}
//         style={{width: 300, height: 300, marginLeft: 40, marginBottom: 40}}
//       />
//       <Text style={styles.subTitle}>
//         Please enter the verification code{'\n'}
//         we send to your email address
//       </Text>

//       <CodeField
//         ref={ref}
//         {...props}
//         value={number}
//         onChangeText={(value) => setNumber(value)}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFiledRoot}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         renderCell={renderCell}
//       />
//       <View style={styles.nextButton}>
//         <Text
//           style={styles.nextButtonText}
//           onPress={() =>
//             OtpVerify().then(() => props.navigation.navigate('RegisterPage'))
//           }>
//           Verify
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VerifyCode;
