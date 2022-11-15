import React from "react";
import AppProvider from "./app/AppProvider";
import TSWhapp from "./TSWhapp";

export default function App() {
    return (<AppProvider>
            <TSWhapp/>
    </AppProvider>)
}
