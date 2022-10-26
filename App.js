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

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  const Drawer = createDrawerNavigator();
  const StackNav = createDrawerNavigator();

  const DrawerNav = () => {
      return (<Drawer.Navigator screenOptions={{
          headerShown: false,
      }} drawerContent={(props) => <AppDrawer {...props}/>}>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      </Drawer.Navigator>)
  }

  return (
      <NavigationContainer header={false}>
        <NativeBaseProvider theme={theme}>
            <StackNav.Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: false,
            }} >
                <StackNav.Screen name="Dashboard" component={DrawerNav} />
                <StackNav.Screen name="Order Picking" component={OrderPickngHomeScreen} />
            </StackNav.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>

  );
}


