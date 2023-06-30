import React, {useState} from "react";
import {QueryClientProvider, QueryClient } from "@tanstack/react-query";
const AppProviderContext = React.createContext();
const MyQueryClient = new QueryClient();

const AppProvider = (props) => {
    const [authenticated, setAuthenticated] = useState(false);

    return (<QueryClientProvider client={MyQueryClient}>
                <AppProviderContext.Provider value={{authenticated, setAuthenticated}}>
                    {props.children}
                </AppProviderContext.Provider>
        </QueryClientProvider>
    )
}

export default AppProvider;
export {AppProviderContext};
