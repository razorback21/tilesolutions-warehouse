import React from 'react';
import {AppProviderContext} from "../components/AppProvider";

import AppDrawer from "../components/shared/AppDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Screens
import LoginScreen from "../components/screens/LoginScreen";
import DashboardScreen from "../components/screens/DashboardScreen";

export default function Index () {
    const {isAuthenticated} =  React.useContext(AppProviderContext);
    const Drawer = createDrawerNavigator();

    return !isAuthenticated ? <LoginScreen /> : (
        <Drawer.Navigator
            initialRouteName="index" screenOptions={{
            headerShown: false,
        }} drawerContent={(props) => <AppDrawer {...props}/>} >
            <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
        </Drawer.Navigator>
    )
}