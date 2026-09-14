import { IInputs } from "../generated/ManifestTypes";
import * as Helpers from '../helpers/PromiseHelper';

interface IDynamicsService {
    context?: ComponentFramework.Context<IInputs> | undefined;
    RetrieveMultipleAsync(entityName: string, optionOdata?: string): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse>;
    RetrieveRecordAsync(entityName: string, id: string, optionOdata?: string): Promise<ComponentFramework.WebApi.Entity>;
    UpdateRecordAsync(entityName: string, id: string, data: object): Promise<ComponentFramework.LookupValue>;
    CreateRecordAsync(entityName: string, data: object): Promise<ComponentFramework.LookupValue>;
}

export class dynamicsService implements IDynamicsService {
    context?: ComponentFramework.Context<IInputs> | undefined;
    private isDeveloperEnv: boolean;
    private mockData: object[];
    private delay: number;

    constructor(context: ComponentFramework.Context<IInputs> | undefined, delay?: number, mockData?: object[]) {
        this.context = context;
        this.isDeveloperEnv = window.location.hostname === 'localhost';
        this.mockData = mockData ?? [];
        this.delay = delay ?? 1000;
    }

    async RetrieveMultipleAsync(entityName: string, optionOdata?: string): Promise<ComponentFramework.WebApi.RetrieveMultipleResponse> {
        if (this.isDeveloperEnv) {
            await Helpers.sleep(this.delay);
            return new Promise((resolve) => {
                const result: ComponentFramework.WebApi.RetrieveMultipleResponse = {
                    entities: this.mockData,
                    nextLink: '',
                };
                resolve(result);
            });
        }
        return new Promise((resolve, reject) => {
            this.context?.webAPI.retrieveMultipleRecords(entityName, optionOdata).then(
                (result) => { return resolve(result); },
                (e) => { return reject(e instanceof Error ? e : new Error(JSON.stringify(e))); }
            )
        });
    }

    async RetrieveRecordAsync(entityName: string, id: string, optionOdata?: string): Promise<ComponentFramework.WebApi.Entity> {
        if (this.isDeveloperEnv) {
            await Helpers.sleep(this.delay);
            return new Promise((resolve) => {
                const result: ComponentFramework.WebApi.Entity = {
                    entityType: entityName,
                    id: id,
                };
                resolve(result);
            });
        }
        return new Promise((resolve, reject) => {
            this.context?.webAPI.retrieveRecord(entityName, id, optionOdata).then(
                (result) => { return resolve(result); },
                (e) => { return reject(e instanceof Error ? e : new Error(JSON.stringify(e))); }
            )
        });
    }

    async UpdateRecordAsync(entityName: string, id: string, data: object): Promise<ComponentFramework.LookupValue> {
        if (this.isDeveloperEnv) {
            await Helpers.sleep(this.delay);
            return new Promise((resolve) => {
                const result: ComponentFramework.LookupValue = {
                    id: id,
                    entityType: entityName,
                };
                resolve(result);
            });
        }
        return new Promise((resolve, reject) => {
            this.context?.webAPI.updateRecord(entityName, id, data).then(
                (result) => { return resolve(result); },
                (e) => { return reject(e instanceof Error ? e : new Error(JSON.stringify(e))); }
            )
        });
    }

    async CreateRecordAsync(entityName: string, data: object): Promise<ComponentFramework.LookupValue> {
        if (this.isDeveloperEnv) {
            await Helpers.sleep(this.delay);
            return new Promise((resolve) => {
                const result: ComponentFramework.LookupValue = {
                    id: 'mock-id',
                    entityType: entityName,
                };
                resolve(result);
            });
        }
        return new Promise((resolve, reject) => {
            this.context?.webAPI.createRecord(entityName, data).then(
                (result) => { return resolve(result); },
                (e) => { return reject(e instanceof Error ? e : new Error(JSON.stringify(e))); }
            )
        });
    }

    async DeleteRecordAsync(entityName: string, id: string): Promise<void> {
        if (this.isDeveloperEnv) {
            await Helpers.sleep(this.delay);
            return new Promise((resolve) => {
                // Mock delete operation
                resolve();
            });
        }
        return new Promise((resolve, reject) => {
            this.context?.webAPI.deleteRecord(entityName, id).then(
                () => { return resolve(); },
                (e) => { return reject(e instanceof Error ? e : new Error(JSON.stringify(e))); }
            )
        });
    }
}