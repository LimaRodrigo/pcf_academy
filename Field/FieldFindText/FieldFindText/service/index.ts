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