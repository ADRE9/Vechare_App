import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Payment(props) {
  return (
    <View style={styles.container}>
      <Text>Select the payment option</Text>
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

export default Payment;
