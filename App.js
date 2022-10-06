import React from "react";

import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { Platform } from "react-native";

import AppTheme from "./AppTheme";

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  return (
    <NativeBaseProvider theme={theme}>

    </NativeBaseProvider>
  );
}


