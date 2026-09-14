import React from "react";
import TabManager from "../../components/TabManager/TabManager";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import ChatPage from '../Chat';
import Configuracoes from "../Configuracoes";
import Fixado from "../Fixado";
import { IContact } from "../../types/IContact";
import { MainService } from "../../services/MainService";
import * as Mock from "../../mocks";

import "./style.css";
import { Avatar, Divider, Tag } from "@fluentui/react-components";
import Loading from "../../components/common/Loading";

interface IHomeProps {
    context?: ComponentFramework.Context<any>;
}

interface IHomeState {
    conatcts: IContact[];
    isLoading?: boolean;
}

function Home(props: IHomeProps) {
    const dynamicsServce = new MainService<IContact>(props.context, Mock.contacts);
    const { selectedTab } = useGlobalContext();
    const [state, setState] = React.useState<IHomeState>({
        conatcts: [],
        isLoading: true,
    });

    React.useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await dynamicsServce.getData("contacts", "?$select=contactid,fullname,emailaddress1,annualrevenue&$top=10");

            setState({
                ...state,
                conatcts: contacts,
                isLoading: false,
            });
        };
        fetchContacts();
    }, []);


    const generateContactList = () => {
        if (state.isLoading) {
            return <Loading size="small" />;
        }
        return (
            <div className="pcf-sample-hooks-contact-list-home">
                {state.conatcts.map((contact) => (
                    <Tag key={`contact-${contact.emailaddress1}`} shape="circular" media={<Avatar name={contact.fullname} badge={{ status: "busy" }} />}>
                        {contact.fullname}
                    </Tag>))
                }
            </div>
        );
    }

    return (
        <div className="pcf-sample-hooks-container-home">
            {console.log("%c [Render] Renderizando Home...", "color: #00cc66")}
            
            {console.info("%c [State] globalState: ", "color: #ccc500ff", selectedTab)}

            <TabManager />
            <div className="pcf-sample-hooks-body-home">
                <div className="pcf-sample-hooks-body-item-chat">
                    {selectedTab === "tabChat" && <ChatPage />}
                    {selectedTab === "tabFixados" && <Fixado />}
                    {selectedTab === "tabConfig" && <Configuracoes />}
                </div>
                <div className="pcf-sample-hooks-body-item-contacts">
                    <Divider alignContent="center">CONTATOS</Divider>
                    {generateContactList()}
                </div>
            </div>
        </div>
    );
}
export default React.memo(Home);