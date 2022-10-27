import 'react-native-gesture-handler';
import React from "react";

import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";

import { NavigationContainer } from '@react-navigation/native';
import MainDrawer from "./components/navigations/MainDrawer";


export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);


  return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <MainDrawer />
            </NavigationContainer>
        </NativeBaseProvider>
  );
}


