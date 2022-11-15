import React from 'react';
import {AppProviderContext} from "../app/AppProvider";

const useAuth = () => {
    const {authenticated, setAuthenticated} = React.useContext(AppProviderContext)

    const appLogin = () => {
        setAuthenticated(true);
    }

    const appLogout = () => {
        setAuthenticated(false);
    }

    return [appLogin, appLogout]
}

export default useAuth;
