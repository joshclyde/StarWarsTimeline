import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SearchBar} from '@rneui/themed';
import fuzzysort from 'fuzzysort';

import {data} from '../data';
import {Row} from '../Row';

export const AllScreen = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  const dataFiltered = useMemo(() => {
    if (search === '') {
      return data;
    }
    return fuzzysort
      .go(search, data, {
        key: 'title',
        threshold: -100000,
      })
      .map(x => x.obj);
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round
        containerStyle={styles.searchBarContainer}
        inputStyle={styles.searchBarInput}
      />
      <FlatList
        data={dataFiltered}
        renderItem={({item}) => <Row {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'rgba(51, 170, 51,  0)',
  },
  searchBarInput: {
    color: 'white',
  },
});
