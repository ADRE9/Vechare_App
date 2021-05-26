import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
// import { BackBtn } from 'svg';

const CustomBack = () => (
    <Image
        source={require("../assets/Back2.png")}
        style={styles.image}
    />
);

const styles = StyleSheet.create({

    image: {
        width: 25,
        height: 25.2,
    },
});

export default CustomBack;
