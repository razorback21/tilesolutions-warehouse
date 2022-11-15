import React from "react";
import 'react-native-gesture-handler';
import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";
import {NavigationContainer} from '@react-navigation/native';
import MainDrawer from "./components/navigations/MainDrawer";
import LoginScreen from "./components/screens/LoginScreen";
import {AppProviderContext} from "./app/AppProvider";


export default function TSWhapp(props) {
    // extend the theme
    const theme = extendTheme(AppTheme);
    const {authenticated}  = React.useContext(AppProviderContext);
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                {authenticated ? <MainDrawer/> : <LoginScreen/>}
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


