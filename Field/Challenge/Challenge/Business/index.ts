import { IConfigField, IField } from "../model/IConfigField"
import * as serviceDynamics from "../Service"
import * as Mock from "../Mock"

export type CustomerData = Record<string, unknown>;

export const getDataCustomer = async (id: string, config: IConfigField): Promise<CustomerData> => {

    if (Mock.isMock) {
        await sleep(500);
        return Mock.customerData;
    }
    const odata = `?$select=${config.fields.map(x => x.logicalName).toString()}`;
    return await serviceDynamics.RetrieveRecord(config.entityLogicalname, id, odata) as CustomerData;

}

export const getConfigVariable = async (): Promise<IConfigField> => {

    if (Mock.isMock) {
        await sleep(2000);
        return Mock.ConfigurationField;
    }

    const config = JSON.parse(await serviceDynamics.getDefaultValueEnvironmentVariableBySchemaname("academy_customerfieldsconfig")) as IConfigField;

    if (!config)
        throw new Error("Parâmetro de campos não configurado");

    return config;
}

export const updateEntity = async (id: string, config: IConfigField): Promise<void> => {
    if (Mock.isMock) {
        await sleep(2000);
        return;
    }
    const objeto: CustomerData = {};

    config.fields.forEach(x=> objeto[x.logicalName] = x.value);

    await serviceDynamics.UpdateRegisterAsync(config.entityLogicalname, id, objeto);

}

const sleep = (ms: number) => { return new Promise((resolve, reject) => setTimeout(resolve, ms)) };