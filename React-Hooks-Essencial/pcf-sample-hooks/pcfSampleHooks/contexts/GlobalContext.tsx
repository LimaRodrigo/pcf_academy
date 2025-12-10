import { SelectTabData } from "@fluentui/react-components";
import { createContext } from "react";
import React from "react";

interface IGlobalContext {
     selectedTab: string;
     setSelectedTab: (v: string) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export default GlobalContext;

export const GlobalContextProvider = (props: { children: React.ReactNode }) => {
    const [stateGlobal, setStateGlobal] = React.useState<string>("tabChat");

    const setSelectedTab = (v: string) => {
        setStateGlobal(v);
    }
    const value: IGlobalContext = {
        selectedTab: stateGlobal,
        setSelectedTab: setSelectedTab
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}