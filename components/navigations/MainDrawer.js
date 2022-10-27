import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppDrawer from "../shared/AppDrawer";
import DashboardStackNav from '../navigations/DashboardStackNav'

const MainDrawer = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard" screenOptions={{
            headerShown: false,
        }} drawerContent={(props) => <AppDrawer {...props}/>} >
            <Drawer.Screen name="Root" component={DashboardStackNav} />
        </Drawer.Navigator>
    )
}

export default MainDrawer;
