import React from "react";
import {QueryClientProvider, QueryClient } from "@tanstack/react-query";
const AppProviderContext = React.createContext();
const MyQueryClient = new QueryClient();
import * as SecureStore from 'expo-secure-store';

const AppProvider = (props) => {

    const isAuthenticated = async () => {
        try {
            const token = await SecureStore.getItemAsync('api-key');
            return token ? true : false;
        } catch (e) {
            console.log('isAuthenticated token read error', e);
        }

        return false;
    }

    return (<QueryClientProvider client={MyQueryClient}>
                <AppProviderContext.Provider value={{isAuthenticated}}>
                    {props.children}
                </AppProviderContext.Provider>
        </QueryClientProvider>
    )
}

export default AppProvider;
export {AppProviderContext};
