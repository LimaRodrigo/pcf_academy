interface DynamicsError {
    message?: string;
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

export const FetchJS = async <T = unknown>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao consultar o endpoint");

    const data: unknown = await response.json();
    if (typeof data === "object" && data !== null && "value" in data)
        return (data as { value: T }).value;

    return data as T;
}