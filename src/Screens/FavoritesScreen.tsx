import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {data} from '../data';
import {Row} from '../Row';

export const FavoritesScreen = () => {
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({item}) => <Row {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
});
