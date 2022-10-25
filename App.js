import 'react-native-gesture-handler';
import React from "react";

import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from "./components/screens/picking/DashboardScreen";
import AppDrawer from "./components/shared/AppDrawer";

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  const Drawer = createDrawerNavigator();

  return (
      <NavigationContainer header={false}>
        <NativeBaseProvider theme={theme}>
            <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: false,
            }} drawerContent={(props) => <AppDrawer {...props}/>}>
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            </Drawer.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>

  );
}


