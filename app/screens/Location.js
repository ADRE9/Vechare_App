import React, {useState} from 'react';
import {View, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  Button,
  Overlay,
  Text,
  Rating,
  AirbnbRating,
} from 'react-native-elements';

export default function RatingScreen() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const ratingCompleted = () => {
    console.log('rating');
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          top: 190,
          flex: 0.5,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          backgroundColor: '#F6F6F6',
        }}>
        <ScrollView style={{width: 365, flex: 1, marginBottom: 50}}>
          <Text style={{fontSize: 30, marginLeft: 20, padding: 10}}>
            Rate your veCharge experience
          </Text>

          <Rating
            type="custom"
            minValue={2}
            startingValue={3}
            onFinishRating={ratingCompleted}
            style={{
              top: 10,
              padding: 10,
            }}
            ratingColor="#3498db"
            tintColor="#F6F6F6"
            ratingBackgroundColor="#D3D3D3"
            imageSize={48}
          />
          <KeyboardAvoidingView>
            <TextInput
              multiline
              placeholder="Describe your experience (optional)"
              style={{
                borderWidth: 1,
                borderColor: '#525252',
                borderRadius: 20,
                textAlignVertical: 'top',
                textAlign: 'left',
              }}
              numberOfLines={5}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Overlay>
    </View>
  );
}

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
