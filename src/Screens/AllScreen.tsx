import React from 'react';
import {FlatList} from 'react-native';

import {data} from '../data';
import {Row} from '../Row';

export const AllScreen = () => {
  return <FlatList data={data} renderItem={({item}) => <Row {...item} />} />;
};
