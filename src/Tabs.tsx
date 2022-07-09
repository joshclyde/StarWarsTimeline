import React, {FC} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NavigationContext} from '@react-navigation/native';

export const Tabs: FC = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <View style={styles.container}>
      <Button
        title="Favorites"
        accessibilityLabel="View your favorited books"
        onPress={() => navigation?.navigate('Favorites')}
      />
      <Button
        title="All"
        accessibilityLabel="View all books"
        onPress={() => navigation?.navigate('All')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200,
    border: 'solid',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: '#444444',
  },
});
