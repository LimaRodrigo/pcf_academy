import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, IStackStyles, Label, SelectionMode, Stack, StackItem } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { IInputs } from './generated/ManifestTypes';
import { ChartCuston } from './components/ChartCuston/ChartCuston';
import { IDataChart } from './model/IDataChart';

export interface IMainProps {
  context: ComponentFramework.Context<IInputs>;
}

export interface IMainState {
  items?: any[],
  tableColumns?: IColumn[],
  itemsChart: IDataChart[]
}

export function Main(props: IMainProps) {
  const [state, setState] = useState<IMainState>({ itemsChart: [] });

  useEffect(() => {
    const registers = generateList();
    setState({
      ...state,
      items: registers,
      tableColumns: generateCollumns(),
      itemsChart: generateDataChart(registers)
    });
  }, [props.context.parameters.accountDataSet]);


  const generateList = (): any[] => {


    let itens: any[] = [];
    let columns = props.context.parameters.accountDataSet.columns.map(x => x.name);
    let ids: any[] = props.context.parameters.accountDataSet.sortedRecordIds;

    ids.forEach((id) => {
      let item: any = {};
      item.id = id;
      columns.forEach((col) => {
        item[col + "_formatted"] = props.context.parameters.accountDataSet.records[id].getFormattedValue(col);
        item[col] = props.context.parameters.accountDataSet.records[id].getValue(col);
      });
      itens.push(item);
    });

    return itens;
  }

  const generateCollumns = (): IColumn[] => {
    let columns: IColumn[] = [];
    const columnsData = props.context.parameters.accountDataSet.columns;

    columnsData.forEach((col) => {
      columns.push({
        key: col.name,
        name: col.displayName.includes("Endereço 1: ") ? col.displayName.replace("Endereço 1: ", "") : col.displayName,
        fieldName: col.name + "_formatted",
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,
      } as IColumn
      );
    });
    return columns;
  }

  const onInvokeItemTable = (item?: any, index?: number | undefined, ev?: Event | undefined) => {
    var data: any = {};
    //@ts-ignore
    data["entityName"] = props.context.page.entityTypeName;
    data["entityId"] = item.id;

    props.context.navigation.openForm(data);
  }

  const getIconRevenue = (val: number) => {
    if (val <= 10000000)
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALtSURBVFiFxZfPTxNBHMXfd7a1QEvloqYYoCBXlUgkMSFG66Fp0S3WlBgOxpN/ABd/HFAxMWCEuydPoqGBhq1AJIbEg1w8KAkGTYhNJJoQTUAtpqXd+XqwJVhKuruA/ZwmmZn33uzO7nyHYBB1XK1mKc4zkw/ExwF4CagBAAZWASRAPMdSzCiKPqGFtF9GdKnUAP9o2GNX9F4wXQFQZTDvbzANC0Uf0ELaoqUAkZFIZcqeuclADwCnQeNC8QyYhrIVqdtTwam04QDquNrMUowxcNSKcRFmhZBhLaQtlwwQjHW2COAFgIO7ZJ5niZmCE+HY/LYB1HG1WUrxeg/M83wWQrZtfhIi3zjz+GqFlCJqxrzR7YXX3WAmQL2UIhaYDDi2BKiuWb0FoMWoktfdgIftAxhsf4CGalMhTinr++78E8A/Gvbkdrthap0eEBGICIddHjNTAaaeQKzzyEYAu6L3wuKnZpF9CvF1ABCByYA795P5vzB1R0YiLmFLOzpg/A+3mzhT9kxQMJOvDOZ5zoncwVIWmPiYANBYrgBgahIA3GULAOwXpcfsLQLAzzL6/xAAElZmSpZF26Yg/mQD8TswnTQ7d2HlI74kv4LBWFj5YMmfpZijjrGLl4n4qSWFHcJMXaIqa3sOIFkG/7WqrG1KRLuiSTA9s6JQ76pHnavOkjsBT6Jd0aQAAKHoAwRkzAjUuepwt7UPfa33rIRIQ9H7gdxxrIW0RTANmVXZgM0NJ6bBuBpPAJtqwtZH1+y1B769ZOLTRoXyK19KLpnxn9UdaV++TC8sSg9JKd4AsPZiS7N9UQoAWkhbZqYgAFNLMmpOih4svBtsOQsmwrF5suknALzaRfNZIWRbXI2/L+woehjFL8S/6460H8T9ANZ3YLxOTPcrM/azxW5FgIHLacfopSZSsjfA1A3jhWuSgGEoen9+t29HyQB5IiMRV8qeCUomnyBu4b+FTE2ue5WABBO/ZSlmMs61yWn/9JoR3T/g3gVvJJLEPQAAAABJRU5ErkJggg==";

    if (val > 10000000 && val < 100000000)
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAutJREFUWIXFl7tPFFEUh7+zwxLCK1FBIomlUBAWtZawkMgCCRSG/QPcThpI0M5OraiMhYnELYyVSwUJLhgeqzGxMMEoRIOlUaI2RqMg+zgW+2Zm57FCONXsnXt+55u55979DRxzSDVJ+mq4md10O2q0ZVXSX/HXfZZL87+ODECfDwVQwiijQE+FWW/At4BITPoW3x0KgK4OdeLjFjDuAViBOQzfTeld3K4aQNeGpxCdAWpcFj4YKUSvS9/SXU8AuhWu5fvP+yARG/EMsJW77gJ8ladqlNbma9IV2z94xzrJufgeGQYlGA9IMB4gwyDwt/J0iWQ1zWEC0LXhKYfiALMyEF8pyA/EVxCZtU+RiCZCk7YAujrUmVtzp/hgGlF975ilMqOJy+cqAmDIHdw1XIOFeqOLPD9q3LYEyO5zveJCBFRPmcc46SoXwpoY6TYBoIRxu89FzABIi0sAQdPjVgBjLgUAzABi8VYqR6GWD3JnOwTc51sWc7sEgPToWrCxAMBuut19MsB/LQGAUFPfXgQQOeMNwGIJLKFsIpUpAVBRrwCqBxtWT3hSyNXMAbDjEcDPy7HCvs/1UK0nBSP1pQhQL14BILlffOW76qEBAVAyyR0o2fe6HtoAOe9BI0JG3wLgkwBI1APAhgTjF6H82J0HPABIFF9Vjg6U+fxl8SASY46skznqUMjMmQByHm7OMsVa5xGGcZJUsgV47D5Nn0j/8mahbtm9FyMdpDObgN9B5QetzW15h6NrwTqk7hvQ5FA+iaS7pO/Zx/xA2d+x9C5uI3rD+THkT6m9kv71PWwdUWHmdGlxEwBA1kCqU0e363roav6Hrg9NAA5HsUYl+PSeqZ7lVHemFOA1aI3j9lUecrppwsqU2tvyRGgSlRkce6JiJEGmrZ48HzZWOrccSgfwgKwNdxsKxJB0l11x8PJplhjpzjoZGQUuVJi2AbqAaqx0qx0KQBnM0mADtZwt+zjd55OEln9Xo3es8Q9YOPiphmvUwgAAAABJRU5ErkJggg==";

    if (val > 100000000)
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABCNJREFUWIWtl01sVFUUx3/nvjedTmmFdGGKbQVqhIimEKAUYsLHmAKCujBMDKE2xoWy0MS4kRUxEr9i4obEjS40gJh0pRFF0VBkUaEhRvGjaG3T1CqFhQIznc6b9+5xYb9m5g3zpvLfzbnnnv/vnbn3nTwhosaSPc1xy0Ex2mWMtBhjEggGQBVrrWZRO2otX9kYrzZ9efRqlLpSKWEiuX+HI84Rx5GVIhXTmQbC94PLvtUDS/uO9S0IYGxnqrHWT3zhurJBKnOGgwDpdO49PxZ/fkXf+1ORAca3dnclaswnxpjaBTnP0+RkHs/zv8WPPb784rG/itdNceBKsntfXdw9dTvMAWKuAdiE610Y7tzXXrxe0IHxrd1ddXH3lEgpWOEuofbpvbgdaxAj+D8PMfXOcdTzSlIDP+Bmeiauf6jVjhUDvVdm1meN/t721JJEzHxc0RyIda4hntqNs7wZc/dd1OzaQuzhLeHJZn45aRHjfDq2OZUoAfAde9o4JkEESeOSUp+QGIQdMl3vW3OwAGAiuX+H68qGKOb/7QppklOxcfOhXhzpSDXNAjjiHKnqqjlOCFRIDFDVsHC9iDkEYMaSPc2OIyuju4OEPK244QCBDQUAoWfwwccaTNxyMOobblZhZmX+gsC35aosigd1u40Y7arOHQgDDjsXgF8eAFSTxhhpqRogCCkaEgusEoTlTkug3Rgjka5egWwQAuCXhDyvNFYobTMg0e/PzLaQpyqOqSpeLgS0IEkWmwUNOj+sA4Wxqaxf7goWyKhyi1NSDcBcmcC35Cq2HxC9bqzVbLX+weDvJRD+j78CYFVJT5YOpTIEw65aO4rjrK4KYHSc9AuHcdeuBtch+Ok3/EuXUVUyaQ8t9/IptofvXUVPA1UBAARDowRDo7O/7bT5ra5diZSvjXXltUinpVgxF3f9A7jr7idQIX0zV505ZBJ19nMBuJZ8cjAWc1ZF3Sl1CRa99RLOPcsA8H4ZZuK5w9hMNcdJ3l1+/qNnDICvPFtND2KPJGfNAWrua6P+0e1VmOOJNW/A9Dheeubo2Uwm90E2myefDwgCi1pFFayCDZS8Z5maypO+mcNvqC+paBoXR3YXeHvZwIfDAO5MMB+LH/Cz2VW5HJsqFZjsG6Bh7865oWSV7NmBqPb9XuP1l+fBzGmkI9VkjLmg0FqpTN1Dm7njiV2oH3DjxEmy5y5Gcf/TMXZja3/veCgAwHDnvnZDcBIWMCVvIYExY+ye1v7eS/PjJYOo7fyJH/I1uk7gm9to32+t3VhsHgoAcO+53mte440dCq8Amf/h7Anyer7x+vb53wIFaJUqjHSkmkTMIYQeYFFE44zCcWOdN2dOezlFHsZXt6XqM1POHqO6XWEt6AqQ6Y8B/QdkRES+A3smUauf3dnXm45S91+0IKS2XKCO/QAAAABJRU5ErkJggg==";
  }

  const onRendertable = (item?: any, index?: number | undefined, column?: IColumn | undefined) => {
    const columnName = column?.fieldName || "";
    if (!item)
      return <></>;
    switch (columnName) {
      case "revenue_formatted":
        return (
          <Stack horizontal horizontalAlign='start' tokens={{ childrenGap: 10 }}>
            {item[columnName] &&
              <Stack.Item>
                <img height={24} src={getIconRevenue(item[columnName.replace("_formatted", "")] as number)} />
              </Stack.Item>
            }
            <Stack.Item>
              {item[columnName]}
            </Stack.Item>
          </Stack>
        );
      default:
        return <>{item[columnName]}</>;
    }
  }

  const generateDataChart = (itens: any[]): IDataChart[] => {
    let list: IDataChart[] = [];
    let registers = [...itens];
    if (registers?.length === 0 || registers[0].name === "val")
      return list;
    let field = props.context.parameters.fieldChart.raw! + "_formatted";
    let legends = (registers.filter((item, i, arr) => arr.findIndex(x => x[field] === item[field]) === i)).map(x => x[field]);

    legends.forEach((legend, i: number) => {
      let itensLegends = registers.filter(x => x[field] === legend);
      let color = i === 0 ? colors.azul : i === 1 ? colors.verde : colors.vermelho;

      list.push({
        color: color,
        data: itensLegends.length,
        label: itensLegends[0][field] ? itensLegends[0][field] : "vazio"
      } as IDataChart);

    });
    return list;
  }

  return (
    <Stack horizontal horizontalAlign='space-between' tokens={{ childrenGap: 10, padding: "15px" }} styles={styleStackBase}>
      {console.info("state", state)}
      <Stack.Item styles={styleStackA}>
        <DetailsList
          items={state.items || []}
          compact={false}
          columns={state.tableColumns}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderItemColumn={onRendertable}
          selectionMode={SelectionMode.multiple}
          onItemInvoked={onInvokeItemTable}
        />
      </Stack.Item>
      <Stack.Item styles={styleStacB}>
        {state.itemsChart && state.itemsChart.length > 0 ?
          <ChartCuston
            data={state.itemsChart}
          />
          :
          <></>
        }
      </Stack.Item>
    </Stack>
  );
}

const styleStackBase: IStackStyles = {
  root: {
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "auto"
  }
};
const styleStackA: IStackStyles = { root: { width: "70%" } };
const styleStacB: IStackStyles = { root: { width: "25%", } };
export enum colors {
  azul = "#0000FF",
  vermelho = "#B22222",
  verde = "#32CD32"
}