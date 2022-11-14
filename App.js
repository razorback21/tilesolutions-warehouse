import React from "react";
import 'react-native-gesture-handler';
import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";
import AppStore, {AppContext} from "./components/AppStore";
import {NavigationContainer} from '@react-navigation/native';
import MainDrawer from "./components/navigations/MainDrawer";
import LoginScreen from "./components/screens/LoginScreen";



export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);
  console.log(React.useContext(AppContext));
  return (
      <AppStore>
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                {false ? <MainDrawer/> : <LoginScreen/>}
            </NavigationContainer>
        </NativeBaseProvider>
      </AppStore>
  );
}


