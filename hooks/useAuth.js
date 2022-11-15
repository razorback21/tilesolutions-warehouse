import React from 'react';
import {AppProviderContext} from "../app/AppProvider";
import useApi from "./useApi";
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
    const [tsQuery] = useApi();
    const {authenticated, setAuthenticated} = React.useContext(AppProviderContext)

    const appLogin = (email, password) => {
        console.log(email, password);
        //setAuthenticated(true);
        tsQuery(`
            AppLogin($Email: String!, $Password: String!) {
                Login(Email: $Email, Password: $Password) {
                    success
                    message
                    expires
                    token
                }
            }
        `, `
            {
                "Email": "${email}",
                "Password" : "${password}"
            }
        `).then(res => {
            console.log(res.data)
        })
    }

    const appLogout = () => {
        setAuthenticated(false);
    }

    return [appLogin, appLogout]
}

export default useAuth;
