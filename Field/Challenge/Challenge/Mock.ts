import { IConfigField } from "./model/IConfigField";

export const isMock = window.location.hostname === "localhost";

export const ConfigurationField: IConfigField = {
    "entityLogicalname": "account",
    "entityDisplayname": "Conta",
    "fields": [
        { "displayName": "Nome", "logicalName": "name", "type": "text", "readonly": false, "required": true },
        { "displayName": "Telefone", "logicalName": "telephone1", "type": "text", "readonly": false, "required": true },
    ]
}

export const customerData = {
    "name": "NTT DATA",
    "telephone1": "114646464"
}