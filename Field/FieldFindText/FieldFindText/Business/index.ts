import { IComboBoxOption } from "@fluentui/react";
import * as servicesDynamics from "../service";
import * as MOCK from "../Mock";
import { MetadataEntity } from "../Mock";

export const GetEntities = async (): Promise<IComboBoxOption[]> => {
    const list: IComboBoxOption[] = [];

    if (MOCK.isMock) {
        await sleep(3000);
        MOCK.data.forEach((x: MetadataEntity) => {
            if (x.DisplayName?.UserLocalizedLabel)
                list.push({
                    key: x.LogicalName,
                    text: `${x.DisplayName.UserLocalizedLabel?.Label} [${x.LogicalName}]`,
                })
        });
        return list;
    }

    const url = "/api/data/v9.2/EntityDefinitions?$select=LogicalName,DisplayName";
    const response = await servicesDynamics.FetchJS<MetadataEntity[]>(url);

    response.forEach((x: MetadataEntity) => {
        if (x.DisplayName?.UserLocalizedLabel)
            list.push({
                key: x.LogicalName,
                text: `${x.DisplayName.UserLocalizedLabel?.Label} [${x.LogicalName}]`
                })
    });

    return list;
}

export const GetAttributes = async (entity: string): Promise<IComboBoxOption[]> => {
    const list: IComboBoxOption[] = [];
    if (MOCK.isMock) {
        await sleep(3000);
        MOCK.data.filter((z: MetadataEntity) => z.LogicalName === entity).forEach((table: MetadataEntity) => {
            table.Attributes.forEach((att) => {
                if (att.DisplayName?.UserLocalizedLabel)
                    list.push({
                        key: att.LogicalName,
                        text: `${att.DisplayName.UserLocalizedLabel?.Label} [${att.LogicalName}]`
                    });
            });
        });
        return list;
    }
    const url = `/api/data/v9.2/EntityDefinitions?$filter=LogicalName eq '${entity}'&$select=LogicalName&$expand=Attributes($select=LogicalName,DisplayName)`;
    const response = await servicesDynamics.FetchJS<MetadataEntity[]>(url);

    response.forEach((table: MetadataEntity) => {
        table.Attributes.forEach((att) => {
            if (att.DisplayName?.UserLocalizedLabel)
                list.push({
                    key: att.LogicalName,
                    text: `${att.DisplayName.UserLocalizedLabel?.Label} [${att.LogicalName}]`
                });
        });
    });

    return list;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));