import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, IGroup, Icon, SelectionMode, Stack, Text } from '@fluentui/react';
import { IPositiveConfirmation, Ilookup } from './model';
import { useEffect, useState } from 'react';
import { formatDatetimeBr } from './services';
import * as MOCK from "./Mock";

export interface IMainProps {

  dataSet: ComponentFramework.PropertyTypes.DataSet
}

export interface IMainState {
  items: IPositiveConfirmation[]
  tableColumns?: IColumn[],
  tableGroups?: IGroup[]
}
export function Main(props: IMainProps) {
  const [state, setState] = useState<IMainState>({ items: [] });

  useEffect(() => {
    let data = generateList()
    setState({
      ...state,
      items: data,
      tableColumns: generateCollumns(),
      tableGroups: getGroupsitem(data)
    })
  }, [props.dataSet.records]);

  const generateList = (): IPositiveConfirmation[] => {
    if (MOCK.isMock)
      return MOCK.positiveConfirmations;

    let itens: IPositiveConfirmation[] = [];
    let columns = props.dataSet.columns.map(x => x.name);
    let ids: any[] = props.dataSet.sortedRecordIds;

    ids.forEach((id) => {
      let item: any = {};
      item.academy_positiveconfimationid = id;
      columns.forEach((col) => {
        item[col] = props.dataSet.records[id].getValue(col);
      });
      itens.push(item as IPositiveConfirmation);
    });

    return itens;
  }

  const generateCollumns = (): IColumn[] => {
    let columns: IColumn[] = [];
    let columnsData = MOCK.isMock ? MOCK.columnsDataset.filter(x=> x.name  !== "createdon") : props.dataSet.columns.filter(x=> x.name  !== "createdon");

    columnsData.forEach((col) => {
      columns.push({ key: col.name, name: col.displayName, fieldName: col.name, minWidth: 100, maxWidth: 150, isResizable: true } as IColumn);
    });
    return columns;
  }

  const getGroupsitem = (data: IPositiveConfirmation[]): IGroup[] => {
    let groups: IGroup[] = [];

    let registersGroups = data.filter(x => !x.academy_positiveconfimationprincipal);

    registersGroups.forEach((x) => {
      let startIndex = data.findIndex(y => y.academy_positiveconfimationprincipal?.id?.guid === x.academy_positiveconfimationid);

      let count = data.filter(y => y.academy_positiveconfimationprincipal?.id?.guid === x.academy_positiveconfimationid).length;

      groups.push({
        key: x.academy_code,
        name: `${x.academy_code} - ${formatDatetimeBr(new Date(x.createdon!))}`,
        startIndex: startIndex,
        count: count,
        level: 0
      })


    });
    return groups;
  }

  const onRendertable = (item?: any, index?: number | undefined, column?: IColumn | undefined) => {
    const columnName = column?.fieldName || "";

    if (!item)
      return <></>;

    switch (columnName) {
      case "createdon":
        return <>{formatDatetimeBr(new Date(item[columnName]))}</>
      case "academy_answeriscorrect":
        return <Stack horizontal horizontalAlign='center'>{item[columnName] === "1" ?
        <Text variant='large'><Icon iconName="Accept" styles={{ root: { color: "green" } }} /> </Text>:
        <Text variant='large'> <Icon iconName="Cancel" styles={{ root: { color: "red" } }}/> </Text>}
        </Stack>
      case "academy_incidentid":
      case "academy_positiveconfimationprincipal":
        return <>{item[columnName] ? (item[columnName] as Ilookup).name : ""}</>;
      default:
        return <>{item[columnName]}</>;
    }


  }

  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>

      {console.info("dataset", props.dataSet)}
      {console.info("state", state)}
      <DetailsList
        items={state.items}
        compact={false}
        groups={state.tableGroups}
        columns={state.tableColumns}
        layoutMode={DetailsListLayoutMode.justified}
        onRenderItemColumn={onRendertable}
        selectionMode={SelectionMode.none}
      />
    </Stack>
  );
}