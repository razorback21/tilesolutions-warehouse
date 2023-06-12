import React from "react";
import AppProvider from "../components/AppProvider";
import AppTheme from "../AppTheme";
import {extendTheme, NativeBaseProvider} from "native-base";
import { Slot } from 'expo-router';

export default function App() {
    const theme = extendTheme(AppTheme);

    return (<AppProvider>
        <NativeBaseProvider theme={theme}>
            <Slot />
        </NativeBaseProvider>
    </AppProvider>)
}