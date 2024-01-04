export const RetrieveMultipleRecords = (entityLogicalName: string, options?: string | undefined, maxPageSize?: number | undefined): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse> => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        // eslint-disable-next-line
        Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, options, maxPageSize).then(
            function (response: ComponentFramework.WebApi.RetrieveMultipleResponse) {
                resolve(response);
            },
            function (error: any) {
                reject(error.message);
            });
    });
}
export const RetrieveRecord = (entityLogicalName: string, id: string, options?: string | undefined): Promise<ComponentFramework.WebApi.Entity> => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        // eslint-disable-next-line
        Xrm.WebApi.retrieveRecord(entityLogicalName, id, options).then(
            function (response: ComponentFramework.WebApi.Entity) {
                resolve(response);
            },
            function (error: any) {
                reject(error.message);
            });
    });
}
export const CreateRegisterAsync = (nomeEntidade: string, objeto: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        // eslint-disable-next-line
        Xrm.WebApi.createRecord(nomeEntidade, objeto).then(
            (result: any) => {
                resolve(result.id);
            },
            (e: any) => {
                reject(e);
            }
        );
    });
}

export const FetchJS = async (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok)
                    reject("erro");
                return response.json();
            }).then((data) => {
                resolve(data.value);
            }).catch((e) => reject(e));
    });
}

export const getDefaultValueEnvironmentVariableBySchemaname = async (schemaname: string): Promise<string> => {
    let value = "";
    let odata = `?$filter=schemaname eq '${schemaname}'&$select=schemaname,defaultvalue`;
    let response = await RetrieveMultipleRecords("environmentvariabledefinition", odata);

    if (response.entities.length === 1)
        value = response.entities[0].defaultvalue;
    return value;
}


export const groupBy = (input: any, key: string): Array<any> => {
    return input.reduce((acc: any, currentValue: any) => {
        let groupKey = currentValue[key];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
    }, {});
};


export const getRandonListObjects = (list: any[], total: number, fieldCompare: any): any[] => {
    if (list.length === 0) return list;
    let items: any[] = [];

    while (items.length <= total) {
        let itemRand = list[Math.floor(Math.random() * list.length)];
        if (items.filter(x => x[fieldCompare] === itemRand[fieldCompare]).length === 0) {
            items.push({ ...itemRand });
        }
    }
    return items;
}

export const sleep = (ms: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}