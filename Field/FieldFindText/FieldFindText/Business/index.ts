import { IComboBoxOption } from "@fluentui/react";
import * as servicesDynamics from "../service";
import * as MOCK from "../Mock"

export const GetEntities = async (): Promise<IComboBoxOption[]> => {
    let list: IComboBoxOption[] = [];

    if (MOCK.isMock) {
        await sleep(3000);
        MOCK.data.forEach((x: any) => {
            if (x.DisplayName?.UserLocalizedLabel)
                list.push({
                    key: x.LogicalName,
                    text: `${x.DisplayName.UserLocalizedLabel?.Label} [${x.LogicalName}]`,
                } as IComboBoxOption)
        });
        return list;
    }

    let url = "/api/data/v9.2/EntityDefinitions?$select=LogicalName,DisplayName";
    let response = await servicesDynamics.FetchJS(url);

    response.forEach((x: any) => {
        if (x.DisplayName?.UserLocalizedLabel)
            list.push({
                key: x.LogicalName,
                text: `${x.DisplayName.UserLocalizedLabel?.Label} [${x.LogicalName}]`
            } as IComboBoxOption)
    });

    return list;
}

export const GetAttributes = async (entity: string): Promise<IComboBoxOption[]> => {
    let list: IComboBoxOption[] = [];
    if (MOCK.isMock) {
        await sleep(3000);
        MOCK.data.filter((z: any) => z.LogicalName === entity).forEach((table: any) => {
            table.Attributes.forEach((att: any) => {
                if (att.DisplayName?.UserLocalizedLabel)
                    list.push({
                        key: att.LogicalName,
                        text: `${att.DisplayName.UserLocalizedLabel?.Label} [${att.LogicalName}]`
                    } as IComboBoxOption);
            });
        });
        return list;
    }
    let url = `/api/data/v9.2/EntityDefinitions?$filter=LogicalName eq '${entity}'&$select=LogicalName&$expand=Attributes($select=LogicalName,DisplayName)`;
    let response = await servicesDynamics.FetchJS(url);

    response.forEach((table: any) => {
        table.Attributes.forEach((att: any) => {
            if (att.DisplayName?.UserLocalizedLabel)
                list.push({
                    key: att.LogicalName,
                    text: `${att.DisplayName.UserLocalizedLabel?.Label} [${att.LogicalName}]`
                } as IComboBoxOption);
        });
    });

    return list;
}

const sleep = (ms: number) => { return new Promise((resolve, reject) => setTimeout(resolve, ms)) };