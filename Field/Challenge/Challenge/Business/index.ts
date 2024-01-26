import { IConfigField, IField } from "../model/IConfigField"
import * as serviceDynamics from "../Service"
import * as Mock from "../Mock"

export const getDataCustomer = async (id: string, config: IConfigField): Promise<any> => {

    if (Mock.isMock) {
        await sleep(500);
        return Mock.customerData;
    }
    let odata = `?$select=${config.fields.map(x => x.logicalName).toString()}`;
    return serviceDynamics.RetrieveRecord(config.entityLogicalname, id, odata);

}

export const getConfigVariable = async (): Promise<IConfigField> => {

    if (Mock.isMock) {
        await sleep(2000);
        return Mock.ConfigurationField;
    }

    const config = JSON.parse(await serviceDynamics.getDefaultValueEnvironmentVariableBySchemaname("academy_customerfieldsconfig"));

    if (!config)
        throw ("Parâmetro de campos não configurado");

    return config as IConfigField;
}

export const updateEntity = async (id: string, config: IConfigField): Promise<void> => {
    if (Mock.isMock) {
        await sleep(2000);
        return;
    }
    let objeto: any = {};

    config.fields.forEach(x=> objeto[x.logicalName] = x.value);

    await serviceDynamics.UpdateRegisterAsync(config.entityLogicalname, id, objeto);

}

const sleep = (ms: number) => { return new Promise((resolve, reject) => setTimeout(resolve, ms)) };