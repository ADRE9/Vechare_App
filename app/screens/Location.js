// import React, {useEffect, useState} from 'react';
// import {Button} from 'react-native';
// import {View, StyleSheet, Text} from 'react-native';
// import RNLocation from 'react-native-location';

// RNLocation.configure({
//   distanceFilter: null,
// });

// export default function Location(props) {
//   const [viewLocation, isViewLocation] = useState([]);

//   useEffect(() => {
//     const getLocation = async () => {
//       let permission = await RNLocation.checkPermission({
//         ios: 'whenInUse', // or 'always'
//         android: {
//           detail: 'coarse', // or 'fine'
//         },
//       });

//       console.log(permission);

//       let location;
//       if (!permission) {
//         permission = await RNLocation.requestPermission({
//           ios: 'whenInUse',
//           android: {
//             detail: 'coarse',
//             rationale: {
//               title: 'We need to access your location',
//               message: 'We use your location to show where you are on the map',
//               buttonPositive: 'OK',
//               buttonNegative: 'Cancel',
//             },
//           },
//         });
//         console.log(permission);
//         location = await RNLocation.getLatestLocation({timeout: 100});
//         console.log(location);
//         isViewLocation(location);
//       } else {
//         location = await RNLocation.getLatestLocation({timeout: 100});
//         console.log(location);
//         isViewLocation(location);
//       }
//     };
//     getLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>React Native Geolocation</Text>
//       <View
//         style={{
//           marginTop: 10,
//           padding: 10,
//           borderRadius: 10,
//           width: '40%',
//         }}></View>
//       <Text>Latitude: {viewLocation.latitude} </Text>
//       <Text>Longitude: {viewLocation.longitude} </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
