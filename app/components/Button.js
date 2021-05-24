import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from './theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Button = ({mode, style, ...props}) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: theme.colors.surface},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  />
);

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: wp('10%'),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 22,
  },
});
export default Button;
