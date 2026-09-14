import { SelectTabData } from "@fluentui/react-components";
import { createContext } from "react";
import React from "react";

interface IGlobalContext {
    selectedTab: string;
    setSelectedTab: (tabName: string) => void;
}

// Criando o contexto global
//https://pt-br.react.dev/reference/react/createContext
const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export default GlobalContext;

interface IGlobalContextProviderProps {
    children: React.ReactNode;
}

// Criando o provedor do contexto global
//https://pt-br.react.dev/reference/react/Context/Provider
export const GlobalContextProvider = (props: IGlobalContextProviderProps) => {
    // Gerenciando o estado global aqui no provedor
    const [stateGlobal, setStateGlobal] = React.useState<string>("tabChat");

    // Função para atualizar a aba selecionada
    const setSelectedTab = (tabName: string) => {
        setStateGlobal(tabName);
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