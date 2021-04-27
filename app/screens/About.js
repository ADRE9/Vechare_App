import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function About({navigation}) {
  return (
    <View style={styles.container}>
      <Text> About us </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          width: '40%',
          marginLeft: 20,
          padding: 10,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'white'}}>go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default About;
