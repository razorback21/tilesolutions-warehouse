import 'react-native-gesture-handler';
import React from "react";

import {
    NativeBaseProvider,
    extendTheme
} from "native-base";

import AppTheme from "./AppTheme";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

  const StackNav = createNativeStackNavigator();

  return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <StackNav.Navigator initialRouteName="Dashboard" screenOptions={{
                    headerShown: false,
                }} drawerContent={(props) => <AppDrawer {...props}/>}>
                    <StackNav.Screen name="Dashboard" component={DashboardScreen} />
                    <StackNav.Screen name="OrderPicking" component={OrderPickingHomeScreen} />
                    <StackNav.Screen name="OrderReceived" component={OrderReceivedScreen} />
                    <StackNav.Screen name="PickingStepOne" component={PickingStepOneScreen} />
                    <StackNav.Screen name="PickingStepTwo" component={PickingStepTwoScreen} />
                    <StackNav.Screen name="PickingStepThree" component={PickingStepThreeScreen} />
                    <StackNav.Screen name="ActualPicking" component={ActualPickingScreen} />
                    <StackNav.Screen name="PickedItemInformation" component={PickedItemInfoScreen} />
                </StackNav.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
  );
}


