import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppBar} from './src/AppBar';
import {data} from './src/data';
import {Row} from './src/Row';
import {Tabs} from './src/Tabs';
import {Text} from './src/Text';

const FavoritesScreen = () => {
  return (
    <View style={styles.blackBackground}>
      <FlatList data={data} renderItem={({item}) => <Row {...item} />} />
    </View>
  );
};

const AllScreen = () => {
  return (
    <View style={styles.blackBackground}>
      <Text>All Page</Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.blackBackground}>
      <Tabs />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        {/* <AppBar /> */}
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{title: 'Favorites'}}
          />
          <Stack.Screen
            name="All"
            component={AllScreen}
            options={{title: 'All'}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  blackBackground: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
});

export default App;
