import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, IGroup, Icon, SelectionMode, Stack, Text } from '@fluentui/react';
import { IPositiveConfirmation, Ilookup } from './model';
import { useEffect, useState } from 'react';
import { formatDatetimeBr } from './services';
import * as MOCK from "./Mock";

export interface IMainProps {

  dataSet: ComponentFramework.PropertyTypes.DataSet
}

type TableItem = Record<string, unknown> & {
  academy_positiveconfimationid: string;
};

export interface IMainState {
  items: IPositiveConfirmation[]
  tableColumns?: IColumn[],
  tableGroups?: IGroup[]
}
export function Main(props: IMainProps) {
  const [state, setState] = useState<IMainState>({ items: [] });

  useEffect(() => {
    const data = generateList()
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

    const itens: IPositiveConfirmation[] = [];
    const columns = props.dataSet.columns.map(x => x.name);
    const ids: string[] = props.dataSet.sortedRecordIds;

    ids.forEach((id) => {
      const item: TableItem = { academy_positiveconfimationid: id };
      columns.forEach((col) => {
        item[col] = props.dataSet.records[id].getValue(col);
      });
      itens.push(item as unknown as IPositiveConfirmation);
    });

    return itens;
  }

  const generateCollumns = (): IColumn[] => {
    const columns: IColumn[] = [];
    const columnsData = MOCK.isMock ? MOCK.columnsDataset.filter(x=> x.name  !== "createdon") : props.dataSet.columns.filter(x=> x.name  !== "createdon");

    columnsData.forEach((col) => {
      columns.push({ key: col.name, name: col.displayName, fieldName: col.name, minWidth: 100, maxWidth: 150, isResizable: true } as IColumn);
    });
    return columns;
  }

  const getGroupsitem = (data: IPositiveConfirmation[]): IGroup[] => {
    const groups: IGroup[] = [];

    const registersGroups = data.filter(x => !x.academy_positiveconfimationprincipal);

    registersGroups.forEach((x) => {
      const startIndex = data.findIndex(y => y.academy_positiveconfimationprincipal?.id?.guid === x.academy_positiveconfimationid);

      const count = data.filter(y => y.academy_positiveconfimationprincipal?.id?.guid === x.academy_positiveconfimationid).length;

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

  const onRendertable = (item?: TableItem, index?: number, column?: IColumn) => {
    const columnName = column?.fieldName ?? "";

    if (!item)
      return <></>;

    switch (columnName) {
      case "createdon":
        return <>{formatDatetimeBr(new Date(item[columnName] as string))}</>
      case "academy_answeriscorrect":
        return <Stack horizontal horizontalAlign='center'>{item[columnName] === "1" ?
        <Text variant='large'><Icon iconName="Accept" styles={{ root: { color: "green" } }} /> </Text>:
        <Text variant='large'> <Icon iconName="Cancel" styles={{ root: { color: "red" } }}/> </Text>}
        </Stack>
      case "academy_incidentid":
      case "academy_positiveconfimationprincipal":
        return <>{item[columnName] ? (item[columnName] as Ilookup).name : ""}</>;
      default:
        return <>{renderCellValue(item[columnName])}</>;
    }


  }

  const renderCellValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined || typeof value === "boolean" || typeof value === "string" || typeof value === "number")
      return value;

    return JSON.stringify(value) ?? "";
  }

  return (
    <Stack tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>

      {console.info("AnalysisPositiveConfirmation_dataset", props.dataSet)}
      {console.info("AnalysisPositiveConfirmation_state", state)}
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