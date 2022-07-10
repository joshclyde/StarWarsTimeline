import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {data} from '../data';
import {Row} from '../Row';
import {useStatus, useFavorites} from '../storage';
import {Text} from '../Text';

const FavoritesList = ({favorites}: {favorites: Array<string>}) => {
  const dataFavorites = useMemo(() => {
    return data.filter(({title}) => favorites.includes(title));
  }, [favorites]);

  return (
    <FlatList
      style={styles.container}
      data={dataFavorites}
      renderItem={({item}) => <Row {...item} />}
    />
  );
};

export const FavoritesScreen = () => {
  const status = useStatus();
  const [favorites] = useFavorites();

  if (status === 'ERROR') {
    return <Text>There was an error loading your favorites.</Text>;
  }
  if (status === 'PENDING') {
    return <Text>Loading your favorites.</Text>;
  }

  if (favorites == null || favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>You have no favorites.</Text>
      </View>
    );
  }
  return <FavoritesList favorites={favorites} />;
};

const styles = StyleSheet.create({
  container: {},
});
