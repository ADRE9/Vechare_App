/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRScreen = ({navigation}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    async function value() {
      try {
        await AsyncStorage.setItem('id', qrvalue);
        console.log(qrvalue);
      } catch (e) {
        console.log('error in token storing', e);
      }
    }
    value();
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
  const value = async () => {};
  useEffect(() => {
    value();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View style={{flex: 0.5}}>
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

            // onReadCode={() =>
            //   props.navigation.navigate('Status', {
            //     value: qrvalue,
            //   })
            // }
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <Text style={styles.titleText}>QR Code Scanner</Text> */}
          <Text style={styles.textStyle}>
            {qrvalue ? navigation.replace('Status') : ''}
          </Text>
          {/* <Button
            title="status"
            onPress={() => navigation.navigate('Status')}
          /> */}
          <TouchableHighlight onPress={onOpneScanner}>
            <Image
              source={require('../assets/scanner.png')}
              style={{width: 250, height: 250}}
            />
          </TouchableHighlight>
          <Text
            style={{
              marginTop: 30,
              fontSize: 23,
              fontWeight: 'bold',
              width: '80%',
            }}>
            Charge via Station ID
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 35,
              right: 95,
            }}>
            Enter code here
          </Text>
          <TextInput style={styles.input} placeholder="Enter station" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default QRScreen;

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
  input: {
    marginTop: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    marginRight: 30,
    borderRadius: 30,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#e7e7e7',
    color: 'black',
    width: 280,
  },
});
