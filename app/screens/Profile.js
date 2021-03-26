/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

function Profile(props) {
  const signOut = async () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <View style={{marginTop: 30}}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
