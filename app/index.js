import React from 'react';
import LoginScreen from "../components/LoginScreen";
import DashboardScreen from "../components/screens/DashboardScreen";

import {AppProviderContext} from "../components/AppProvider";

export default function Index () {
    const {authenticated, setAuthenticated} =  React.useContext(AppProviderContext);

    return authenticated ? <LoginScreen /> : <DashboardScreen />
}