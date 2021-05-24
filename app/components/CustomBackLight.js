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
        width: 26,
        height: 26,
    },
});

export default CustomBackLight;
