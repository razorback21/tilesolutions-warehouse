import React, {useState} from 'react';
import {AppProviderContext} from "../components/AppProvider";
import useApi from "./useApi";
import * as SecureStore from 'expo-secure-store';
import {useQueryClient} from "@tanstack/react-query";

const useAuth = () => {
    const {tsQuery} = useApi();
    const queryClient = useQueryClient();
    const {setAuthenticated} = React.useContext(AppProviderContext)

    const appLogin = (email, password) => {
        return tsQuery(`
            AppLogin($Email: String!, $Password: String!) {
                Login(Email: $Email, Password: $Password) {
                    success
                    message
                    expires
                    token
                }
            }
        `,
            {
                Email: email,
                Password : password
            }
        ).then(async res => {
            const data = res.data.data.Login;
            try {
                await SecureStore.setItemAsync('api-token', data.token);
                const token = await SecureStore.getItemAsync('api-token');
                if(token) {
                    setAuthenticated(true);
                }
            } catch (e) {
                console.log('Login auth token save error :', e);
            }

        });
    }

    const appLogout = async () => {
        try {
            await SecureStore.deleteItemAsync('api-token');
            setAuthenticated(false);
            await queryClient.clear()
        } catch (e) {
            console.log('logout auth token read error :', e)
        }

    }

    return {appLogin, appLogout}
}

export default useAuth;
