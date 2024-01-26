export interface IConfigField {
    entityDisplayname: string;
    entityLogicalname: string;
    fields: IField[];
}

export interface IField {
    type: string;
    displayName: string;
    logicalName: string;
    required: boolean;
    readonly: boolean;
    errorMessage?: string;
    value?: any | null | undefined;
}