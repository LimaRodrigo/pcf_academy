import React from "react";
import TabManager from "../../components/TabManager/TabManager";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import ChatPage from '../Chat';
import Configuracoes from "../Configuracoes";
import Fixado from "../Fixado";
import "./style.css";

function Home() {
    const { selectedTab } = useGlobalContext();

    return (
        <div className="pcf-sample-hooks-container-home">
            {console.info("globalState: ", selectedTab)}
            <TabManager />
            {selectedTab === "tabChat" && <ChatPage />}
            {selectedTab === "tabFixados" && <Fixado />}
            {selectedTab === "tabConfig" && <Configuracoes />}
        </div>
    );
}
export default React.memo(Home);