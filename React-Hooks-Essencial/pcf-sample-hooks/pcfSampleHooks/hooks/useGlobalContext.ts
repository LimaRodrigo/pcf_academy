import React from "react";
import GlobalContext from "../contexts/GlobalContext";

// Custom hook para acessar o contexto global
//https://pt-br.react.dev/reference/react/useContext
export const useGlobalContext = () => {
    // Acessando o contexto global
    const context = React.useContext(GlobalContext);
    // Verificando se o contexto está disponível
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}