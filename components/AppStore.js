import React from "react";
const AppContext = React.createContext();

const AppStore = (props) => {
    const [authenticated, setAuthenticated] = React.useState(false)

    return (<AppContext.Provider value={{authenticated, setAuthenticated}}>
        {props.children}
    </AppContext.Provider>)

}

export default AppStore
export { AppContext };
