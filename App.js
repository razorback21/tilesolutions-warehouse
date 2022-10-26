import 'react-native-gesture-handler';
import React from "react";

import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppDrawer from "./components/shared/AppDrawer";

import DashboardScreen from "./components/screens/picking/DashboardScreen";
import OrderPickngHomeScreen from "./components/screens/picking/OrderPickngHomeScreen";
import OrderReceivedScreen from "./components/screens/picking/OrderReceivedScreen";

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  const StackNav = createDrawerNavigator();

  return (
      <NavigationContainer header={false}>
        <NativeBaseProvider theme={theme}>
            <StackNav.Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: false,
            }} drawerContent={(props) => <AppDrawer {...props}/>}>
                <StackNav.Screen name="Dashboard" component={DashboardScreen} />
                <StackNav.Screen name="Order Picking" component={OrderPickngHomeScreen} />
                <StackNav.Screen name="Order Received" component={OrderReceivedScreen} />
            </StackNav.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
  );
}


