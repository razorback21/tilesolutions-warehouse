import React from 'react';
import {AppProviderContext} from "../components/AppProvider";
import useApi from "./useApi";
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
    const [tsQuery] = useApi();
    const {setAuthenticated} = React.useContext(AppProviderContext)

    const appLogin = (email, password) => {
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
        `).then(async res => {
            setAuthenticated(true);
            const data = res.data.data.Login;
            await SecureStore.setItemAsync('api_token', data.token);
        }).catch(error => {
            appLogout();
        })
    }

    const appLogout = async () => {
        setAuthenticated(false);
        await SecureStore.deleteItemAsync('api_token');
    }

    return [appLogin, appLogout]
}

export default useAuth;
