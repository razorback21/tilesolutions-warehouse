import React from 'react';
import LoginScreen from "../components/LoginScreen";
import AppProvider from "../components/AppProvider";

export default function Index () {
    const {authenticated, setAuthenticated} =  React.useContext(AppProvider);
    return <LoginScreen />
}