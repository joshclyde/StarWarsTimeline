import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';

const source = require('./images/logo.png');

export const AppBar: FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    border: 'solid',
    borderBottomWidth: 1,
    borderColor: '#444444',
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
