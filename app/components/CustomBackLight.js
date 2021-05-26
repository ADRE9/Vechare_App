import React from 'react';
// import { BackLight } from 'svg';
import { StyleSheet, View, Image } from 'react-native';

const CustomBackLight = () => (
    <Image
        source={require("../assets/Back3.png")}
        style={styles.image}
    />
);

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25.2,
    },
});

export default CustomBackLight;
