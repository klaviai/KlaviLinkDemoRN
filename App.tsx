/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Router from './src/route';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, Linking} from 'react-native';

function App() {
  const linking = {
    prefixes: ['klavilinkdemorn://'],
    config: {
      screens: {
        Redirect: 'redirect',
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (url != null) {
        return url;
      }
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator />}>
      <Router />
    </NavigationContainer>
  );
}

export default App;
