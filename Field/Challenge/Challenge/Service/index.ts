type DynamicsRecord = Record<string, unknown>;

interface DynamicsError {
    message?: string;
}

interface DynamicsResult {
    id: string;
}

const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "message" in error) {
        const message = (error as DynamicsError).message;
        if (typeof message === "string") return message;
    }
    return "Erro desconhecido";
};

export const RetrieveMultipleRecords = async (entityLogicalName: string, options?: string, maxPageSize?: number): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse> => {
    try {
        // @ts-expect-error Xrm is supplied by the model-driven app runtime.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return await Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize) as ComponentFramework.WebApi.RetrieveMultipleResponse;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}
export const RetrieveRecord = async (entityLogicalName: string, id: string, options?: string): Promise<ComponentFramework.WebApi.Entity> => {
    try {
        // @ts-expect-error Xrm is supplied by the model-driven app runtime.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return await Xrm.WebApi.retrieveRecord(entityLogicalName, id, options) as ComponentFramework.WebApi.Entity;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}
export const CreateRegisterAsync = async (nomeEntidade: string, objeto: DynamicsRecord): Promise<string> => {
    try {
        // @ts-expect-error Xrm is supplied by the model-driven app runtime.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const result = await Xrm.WebApi.createRecord(nomeEntidade, objeto) as DynamicsResult;
        return result.id;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}

export const UpdateRegisterAsync = async (nomeEntidade: string, id: string, objeto: DynamicsRecord): Promise<string> => {
    try {
        // @ts-expect-error Xrm is supplied by the model-driven app runtime.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const result = await Xrm.WebApi.updateRecord(nomeEntidade, id, objeto) as DynamicsResult;
        return result.id;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}

export const FetchJS = async (url: string): Promise<unknown> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao consultar o endpoint");

    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null && "value" in data)
        return (data as { value: unknown }).value;

    return data;
}

export const getDefaultValueEnvironmentVariableBySchemaname = async (schemaname: string): Promise<string> => {
    let value = "";
    const odata = `?$filter=schemaname eq '${schemaname}'&$select=schemaname,defaultvalue`;
    const response = await RetrieveMultipleRecords("environmentvariabledefinition", odata);

    if (response.entities.length === 1) {
        const entity = response.entities[0] as unknown as DynamicsRecord;
        const defaultValue = entity.defaultvalue;
        value = typeof defaultValue === "string" ? defaultValue : "";
    }
    return value;
}


export const groupBy = <T extends DynamicsRecord>(input: T[], key: keyof T): Record<string, T[]> => {
    return input.reduce<Record<string, T[]>>((acc, currentValue) => {
        const groupKey = String(currentValue[key]);
        acc[groupKey] ??= [];
        acc[groupKey].push(currentValue);
        return acc;
    }, {});
};


export const getRandonListObjects = <T extends DynamicsRecord, K extends keyof T>(list: T[], total: number, fieldCompare: K): T[] => {
    if (list.length === 0) return list;
    const items: T[] = [];

    while (items.length <= total) {
        const itemRand = list[Math.floor(Math.random() * list.length)];
        if (itemRand && items.filter(x => x[fieldCompare] === itemRand[fieldCompare]).length === 0) {
            items.push({ ...itemRand });
        }
    }
    return items;
}

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}