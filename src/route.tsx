import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomePage, RedirectPage, WebPage} from './pages';

export type RootStackParamList = {
  Home: undefined;
  Web: {url: string};
  Redirect: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Web" component={WebPage} />
      <Stack.Screen name="Redirect" component={RedirectPage} />
    </Stack.Navigator>
  );
};

export default Router;
