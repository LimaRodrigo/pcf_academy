import { SelectTabData, SelectTabEvent, Tab, TabList, TabValue } from "@fluentui/react-components";
import { BookmarkFilled, ChatFilled, SettingsFilled } from "@fluentui/react-icons";
import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
 


function TabManager() {
  const { selectedTab, setSelectedTab } = useGlobalContext();


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

export default React.memo(TabManager);