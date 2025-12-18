import { SelectTabData, SelectTabEvent, Tab, TabList, TabValue } from "@fluentui/react-components";
import { BookmarkFilled, ChatFilled, SettingsFilled } from "@fluentui/react-icons";
import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";



function TabManager() {
  // Usando o contexto global para gerenciar o estado da aba selecionada
  //https://pt-br.react.dev/reference/react/useContext
  const { selectedTab, setSelectedTab } = useGlobalContext();


  // Função para lidar com a seleção de aba usando o evento e os dados fornecidos pelo TabList
  // Utilizando o contexto para atualizar a aba selecionada globalmente
  const onTabSelect = (event: SelectTabEvent<HTMLElement>, data: SelectTabData) => {
    setSelectedTab(data.value as string);
  }

  return (
    <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
      <Tab icon={<ChatFilled />} value="tabChat">
        Chats
      </Tab>
      <Tab icon={<BookmarkFilled />} value="tabFixados">
        Fixados
      </Tab>
      <Tab icon={<SettingsFilled />} value="tabConfig">
        Configurações
      </Tab>
    </TabList>
  )
}
// Exportando o componente TabManager memorizado para evitar re-renders desnecessários
//https://pt-br.react.dev/reference/react/memo
export default React.memo(TabManager);