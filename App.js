import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { Platform } from "react-native";

import HomeScreen from "./components/screens/HomeScreen";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
        <HomeScreen />
    </NativeBaseProvider>
  );
}


