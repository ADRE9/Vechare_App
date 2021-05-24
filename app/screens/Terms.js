import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomBackLight from '../components/CustomBackLight';
import { Submit } from 'svg';


function Terms({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>terms</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});

export default Terms;
