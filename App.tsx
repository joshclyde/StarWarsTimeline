import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useLoadFavorites} from './src/storage';

import {FavoritesScreen, AllScreen} from './src/Screens';

const Tab = createBottomTabNavigator();

const App = () => {
  useLoadFavorites();
  return (
    <NavigationContainer theme={DarkTheme}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'All') {
                iconName = focused ? 'menu-book' : 'import-contacts';
              } else {
                iconName = focused ? 'star' : 'star-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}>
          <Tab.Screen name="All" component={AllScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default App;
