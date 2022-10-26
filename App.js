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
//Order Picking
import OrderPickingHomeScreen from "./components/screens/picking/OrderPickingHomeScreen";
import OrderReceivedScreen from "./components/screens/picking/OrderReceivedScreen";
import PickedItemInfoScreen from "./components/screens/picking/PickedItemInfoScreen";
import PickingStepOneScreen from "./components/screens/picking/PickingStepOneScreen";
import PickingStepTwoScreen from "./components/screens/picking/PickingStepTwoScreen";
import PickingStepThreeScreen from "./components/screens/picking/PickingStepThreeScreen";
import ActualPickingScreen from "./components/screens/picking/ActualPickingScreen";

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
                <StackNav.Screen name="Order Picking" component={OrderPickingHomeScreen} />
                <StackNav.Screen name="Order Received" component={OrderReceivedScreen} />


                <StackNav.Screen name="Picking Step One" component={PickingStepOneScreen} />
                <StackNav.Screen name="Picking Step Two" component={PickingStepTwoScreen} />
                <StackNav.Screen name="Picking Step Three" component={PickingStepThreeScreen} />
                <StackNav.Screen name="Actual Picking" component={ActualPickingScreen} />
                <StackNav.Screen name="Picked Item Information" component={PickedItemInfoScreen} />
            </StackNav.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
  );
}


