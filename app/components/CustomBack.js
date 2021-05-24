import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { BackBtn } from 'svg';

const CustomBack = () => (

    <Image
        source={require("../assets/Back2.png")}
        style={styles.image}
    />

);

const styles = StyleSheet.create({

    image: {
        width: 26,
        height: 26,
    },
});

export default CustomBack;
