/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import {useFocusEffect} from '@react-navigation/native';

const App = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      // Add Event Listener for hardwareBackPress
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View style={{flex: 1}}>
          <CameraScreen
            showFrame={true}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <Text style={styles.titleText}>QR Code Scanner</Text> */}
          <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>
          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <TouchableHighlight onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
              </Text>
            </TouchableHighlight>
          ) : null}
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
          </TouchableHighlight>
          <Text
            style={{
              marginTop: 30,
              marginRight: 190,
              fontSize: 23,
            }}>
            Recent Sessions
          </Text>
          <Text style={{marginTop: 120, marginRight: 100, fontSize: 23}}>
            Charging Points Near me
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    width: 300,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
