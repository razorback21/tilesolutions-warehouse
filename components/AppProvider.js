import React from "react";

const AppProviderContext = React.createContext();

const AppProvider = (props) => {
    const [authenticated, setAuthenticated] = React.useState(false)
    return (<AppProviderContext.Provider value={{authenticated, setAuthenticated}}>
        {props.children}
    </AppProviderContext.Provider>)
}

export default AppProvider;
export {AppProviderContext};
