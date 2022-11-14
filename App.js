import React from "react";
import 'react-native-gesture-handler';
import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";
import { NavigationContainer } from '@react-navigation/native';
import MainDrawer from "./components/navigations/MainDrawer";
import LoginScreen from "./components/screens/LoginScreen";


export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);
  const [authenticated, setAuthenticated] = React.useState(false)

  return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                {authenticated ? <MainDrawer/> : <LoginScreen/>}
            </NavigationContainer>
        </NativeBaseProvider>
  );
}


